package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddResponse;
import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AlgorithmAddHandler implements RequestHandler<AlgorithmAddRequest,AlgorithmAddResponse> {

    @Override
    public AlgorithmAddResponse handleRequest(AlgorithmAddRequest request, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received an add algorithm request from AWS Lambda: \n" + request);

        // extracting algorithm info from add algorithm request
        final String username = request.getUserName();
        final AlgorithmInfo algorithmInfo = request.getAlgorithmInfo();

        // creating a sql query
        final String query = "INSERT INTO Algorithm (algorithmId, name, description, parentClassification, authorId) VALUES (?,?,?,?,?)";

        // save algorithm to the database
        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!\n");

            // TODO: id should be generated on the DB side! Also id should not be a part of request!
            preparedStatement.setString(1, algorithmInfo.getId());
            preparedStatement.setString(2, algorithmInfo.getName());
            preparedStatement.setString(3, algorithmInfo.getDescription());
            preparedStatement.setString(4, algorithmInfo.getParentClassificationId());
            preparedStatement.setString(5, username);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Insert algorithm statement has affected " + rowsAffected + " rows!\n");

            return AlgorithmAddResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .algorithmInfo(algorithmInfo)
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log("Could not execute SQL statement ...");
            return AlgorithmAddResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Could not execute SQL statement ...")
                    .build();
        }
    }
}
