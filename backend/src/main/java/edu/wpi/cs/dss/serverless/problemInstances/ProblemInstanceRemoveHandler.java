package edu.wpi.cs.dss.serverless.problemInstances;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceAddRequest;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceAddResponse;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceRemoveRequest;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.UUID;

public class ProblemInstanceRemoveHandler implements RequestHandler<ProblemInstanceRemoveRequest, GenericResponse> {

    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(ProblemInstanceRemoveRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received an add problem instance request from AWS Lambda:\n" + request);

        // save problem instance to the database
        final GenericResponse response = deleteProblemInstanceFromDB(request);
        logger.log("Sent an add problem instance response to AWS Lambda:\n" + response);

        return response;
    }

    private GenericResponse deleteProblemInstanceFromDB(ProblemInstanceRemoveRequest request) {

        final String id = request.getId();

        final String query = "DELETE FROM problem_instance WHERE id = ?";

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            preparedStatement.setString(1, id);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Delete from problem instance table statement has affected " + rowsAffected + " rows!");

            return ProblemInstanceAddResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
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
