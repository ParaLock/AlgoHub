package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationMergeRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ClassificationMergeHandler implements RequestHandler<ClassificationMergeRequest, GenericResponse> {

    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(ClassificationMergeRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received a merge classification request from AWS Lambda:\n" + request);

        final GenericResponse response = merge(request);
        logger.log("Sent a merge classification response to AWS Lambda:\n" + response);

        return response;
    }

    private GenericResponse merge(ClassificationMergeRequest request) {
        final String sourceId = request.getSourceId();
        final String targetId = request.getTargetId();
        final String query = "UPDATE algorithm SET classification_id=? WHERE classification_id=?";

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            preparedStatement.setString(1, targetId);
            preparedStatement.setString(2, sourceId);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Merge classification statement has affected " + rowsAffected + " rows!");

            return GenericResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .error("")
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
