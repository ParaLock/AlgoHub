package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetResponse;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmReclassifyRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmReclassifyResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AlgorithmReclassifyHandler implements RequestHandler<AlgorithmReclassifyRequest, GenericResponse> {

    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(AlgorithmReclassifyRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received a reclassify algorithm request from AWS Lambda:\n" + request);

        final GenericResponse response = reclassify(request);
        logger.log("Sent a reclassify algorithm response to AWS Lambda:\n" + response);

        return response;
    }

    private GenericResponse reclassify(AlgorithmReclassifyRequest request) {
        // extracting new and old classification id from reclassify algorithm request
        final String oldClassificationId = request.getOldClassificationId();
        final String newClassificationId = request.getNewClassificationId();

        // create sql query
        final String query = "UPDATE algorithm SET classification_id = ? WHERE classification_id = ?";

        // execute query
        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            preparedStatement.setString(1, newClassificationId);
            preparedStatement.setString(2, oldClassificationId);

            try (final ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    final String id = resultSet.getString(1);
                    final String name = resultSet.getString(2);
                    final String description = resultSet.getString(3);
                    final String classificationId = resultSet.getString(4);
                    final String authorId = resultSet.getString(5);

                    return AlgorithmReclassifyResponse.builder()
                            .statusCode(HttpStatus.SUCCESS.getValue())
                            .classificationId(classificationId)
                            .authorId(authorId)
                            .description(description)
                            .name(name)
                            .id(id)
                            .build();
                }
            }

            return GenericResponse.builder()
                    .error(ErrorMessage.ALGORITHM_RECLASSIFICATION_EXCEPTION.getValue())
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue());
            return AlgorithmGetResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue())
                    .build();
        }
    }
}
