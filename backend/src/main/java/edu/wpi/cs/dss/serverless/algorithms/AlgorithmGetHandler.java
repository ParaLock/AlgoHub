package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetResponse;
import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class AlgorithmGetHandler implements RequestHandler<AlgorithmGetRequest, AlgorithmGetResponse> {

    @Override
    public AlgorithmGetResponse handleRequest(AlgorithmGetRequest algorithmGetRequest, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received a get algorithm request from AWS Lambda: \n" + algorithmGetRequest);

        // extracting algorithm id from get algorithm request
        final String id = algorithmGetRequest.getId();

        // retrieve a connection
        final Connection connection;
        try {
            connection = DatabaseUtil.connect(logger);
        } catch (Exception e) {
            final String error = "Not able to retrieve a connection " + e.getMessage();
            e.printStackTrace();
            logger.log(error);

            return new AlgorithmGetResponse(error, "400", null);
        }

        // create sql query
        final String query = "SELECT * FROM Algorithm alg WHERE alg.algorithmId = ?";

        // execute query
        try (final PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, id);

            final ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final String name = resultSet.getString(2);
                final String authorId = resultSet.getString(5);
                final String description = resultSet.getString(3);
                final String parentClassificationId = resultSet.getString(4);

                final AlgorithmInfo algorithmInfo = new AlgorithmInfo(id, name, authorId, description, parentClassificationId);
                logger.log("Algorithm by id: \n" + algorithmInfo);

                return new AlgorithmGetResponse("", "200", algorithmInfo);
            }

            return new AlgorithmGetResponse("Algorithm by the given id is not found!", "400", null);

        } catch (Exception e) {
            e.printStackTrace();
            logger.log("Not able to execute select query!");
            return new AlgorithmGetResponse(e.getMessage(), "400", null);
        }
    }
}
