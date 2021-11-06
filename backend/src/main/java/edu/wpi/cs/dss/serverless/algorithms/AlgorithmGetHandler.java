package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetResponse;
import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AlgorithmGetHandler implements RequestHandler<AlgorithmGetRequest, AlgorithmGetResponse> {

    private LambdaLogger logger;

    @Override
    public AlgorithmGetResponse handleRequest(AlgorithmGetRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received a get algorithm request from AWS Lambda: \n" + request);

        // extracting algorithm id from get algorithm request
        final String id = request.getId();

        // create sql query
        final String query = "SELECT * FROM Algorithm alg WHERE alg.algorithmId = ?";

        // execute query
        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            final AlgorithmGetResponse algorithmGetResponse = findById(id, preparedStatement);
            return algorithmGetResponse;

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log("Could not execute SQL statement ...");
            return AlgorithmGetResponse.builder()
                    .error("Could not execute SQL statement ...")
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .build();
        }
    }

    private AlgorithmGetResponse findById(String id, PreparedStatement preparedStatement) throws SQLException {
        preparedStatement.setString(1, id);

        try (final ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                final String name = resultSet.getString(2);
                final String authorId = resultSet.getString(5);
                final String description = resultSet.getString(3);
                final String parentClassificationId = resultSet.getString(4);

                final AlgorithmInfo algorithmInfo = new AlgorithmInfo(id, name, authorId, description, parentClassificationId);
                logger.log("Algorithm by id:\n" + algorithmInfo);

                return AlgorithmGetResponse.builder()
                        .statusCode(HttpStatus.SUCCESS.getValue())
                        .algorithmInfo(algorithmInfo)
                        .build();
            }
        }

        return AlgorithmGetResponse.builder()
                .error("Could not find an algorithm by the given id ...")
                .statusCode(HttpStatus.BAD_REQUEST.getValue())
                .build();
    }
}
