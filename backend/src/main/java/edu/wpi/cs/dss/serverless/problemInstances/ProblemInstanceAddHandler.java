package edu.wpi.cs.dss.serverless.problemInstances;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceAddRequest;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceAddResponse;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.UUID;

public class ProblemInstanceAddHandler implements RequestHandler<ProblemInstanceAddRequest, GenericResponse> {

    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(ProblemInstanceAddRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received an add problem instance request from AWS Lambda:\n" + request);

        // save problem instance to the database
        final GenericResponse response = insertProblemInstanceToDB(request);
        logger.log("Sent an add problem instance response to AWS Lambda:\n" + response);

        return response;
    }


    private GenericResponse insertProblemInstanceToDB(ProblemInstanceAddRequest request) {
        final String id = UUID.randomUUID().toString();
        final String datasetFilename = request.getDatasetFilename();
        final String datasetSize = request.getDatasetSize();
        final String problemType = request.getProblemType();
        final String implementationId = request.getImplementationId();
        final String authorId = request.getAuthorId();

        final String query = "INSERT INTO problem_instance (id, dataset_filename, dataset_size, problem_type, implementation_id, author_id) VALUES (?, ?, ?, ?, ?, ?)";

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            preparedStatement.setString(1, id);
            preparedStatement.setString(2, datasetFilename);
            preparedStatement.setString(3, datasetSize);
            preparedStatement.setString(4, problemType);
            preparedStatement.setString(5, implementationId);
            preparedStatement.setString(6, authorId);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Insert problem instance statement has affected " + rowsAffected + " rows!");

            return ProblemInstanceAddResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .id(id)
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue());
            return GenericResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue())
                    .build();
        }
    }
}
