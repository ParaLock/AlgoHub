package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddResponse;
import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class AlgorithmAddHandler implements RequestHandler<AlgorithmAddRequest,AlgorithmAddResponse> {

    @Override
    public AlgorithmAddResponse handleRequest(AlgorithmAddRequest algorithmAddRequest, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received an add algorithm request from AWS Lambda: \n" + algorithmAddRequest);

        // extracting algorithm info from add algorithm request
        final String username = algorithmAddRequest.getUserName();
        final AlgorithmInfo algorithmInfo = algorithmAddRequest.getAlgorithmInfo();

        // creating a sql query
        final String query = "INSERT INTO Algorithm (algorithmId, name, description, parentClassification, authorId) VALUES (?,?,?,?,?)";

        // save algorithm to the database
        final Connection connection;
        try {
            connection = DatabaseUtil.connect(logger);
        } catch (Exception e) {
            logger.log("Not able to retrieve a connection: " + e.getMessage());
            return new AlgorithmAddResponse(null, e.getMessage(), "400");
        }

        final PreparedStatement preparedStatement;
        try {
            preparedStatement = connection.prepareStatement(query);
            logger.log("Successfully retrieved a prepared statement!");
        } catch (Exception e) {
            logger.log("Not able to retrieve a prepared statement: " + e.getMessage());
            return new AlgorithmAddResponse(null, e.getMessage(), "400");
        }

        try {
            logger.log("We are inside of the last try block");

            preparedStatement.setString(1, algorithmInfo.getId());
            preparedStatement.setString(2, algorithmInfo.getName());
            preparedStatement.setString(3, algorithmInfo.getDescription());
            preparedStatement.setString(4, algorithmInfo.getParentClassificationId());
            preparedStatement.setString(5, username);

            logger.log("Before executing executeUpdate()");

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Insert algorithm statement has affected " + rowsAffected + " rows!");

            final AlgorithmAddResponse algorithmAddResponse;
            if (rowsAffected == 1) {
                // insert is good
                algorithmAddResponse = new AlgorithmAddResponse(algorithmInfo, "", "200");
            } else {
                // insert is not good
                algorithmAddResponse = new AlgorithmAddResponse(null, "No rows were affected!", "400");
            }

            return algorithmAddResponse;

        } catch (Exception e) {
            e.printStackTrace();
            logger.log("Why we are here???????? " + e.getMessage());
            return new AlgorithmAddResponse(null, e.getMessage(), "400");
        }
    }
}
