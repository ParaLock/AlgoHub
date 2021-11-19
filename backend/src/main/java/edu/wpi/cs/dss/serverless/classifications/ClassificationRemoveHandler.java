package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddResponse;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmRemoveRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmRemoveResponse;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationRemoveRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationRemoveResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ClassificationRemoveHandler implements RequestHandler<ClassificationRemoveRequest, GenericResponse> {
    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(ClassificationRemoveRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received an remove algorithm request from AWS Lambda:\n" + request);

        final GenericResponse response = save(request);
        logger.log("Sent an remove algorithm response to AWS Lambda:\n" + response);

        return response;
    }

    private GenericResponse save(ClassificationRemoveRequest request){
        final String id = request.getId();
        final String query = String.format("DELETE FROM classification WHERE id=%s",id);

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            preparedStatement.setString(1, id);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Delete classification statement has affected " + rowsAffected + " rows!");

            return AlgorithmRemoveResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue()).build();

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
