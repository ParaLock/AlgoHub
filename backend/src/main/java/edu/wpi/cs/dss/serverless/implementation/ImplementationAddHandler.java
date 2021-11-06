package edu.wpi.cs.dss.serverless.implementation;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationAddRequest;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationAddResponse;
import edu.wpi.cs.dss.serverless.implementation.model.ImplementationInfo;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ImplementationAddHandler implements RequestHandler<ImplementationAddRequest, ImplementationAddResponse> {

    @Override
    public ImplementationAddResponse handleRequest(ImplementationAddRequest implementationAddRequest, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received an add implementation request from AWS Lambda: \n" + implementationAddRequest);

        // extracting algorithm info from add algorithm request
        final String username = implementationAddRequest.getUserName();
        final ImplementationInfo implementationInfo = implementationAddRequest.getImplementationInfo();

        // creating a sql query
        final String query = "INSERT INTO Implementation (implementationId, sourceCodeFilename, name, parentAlgorithm, authorId) VALUES (?,?,?,?,?)";

        // retrieve a connection
        final Connection connection;
        try {
            connection = DatabaseUtil.connect(logger);
        } catch (Exception e) {
            logger.log("Not able to retrieve a connection: " + e.getMessage());
            return ImplementationAddResponse.builder()
                    .error("Not able to retrieve a connection")
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .build();
        }

        try (final PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            // TODO: id should be generated on the DB side! Also id should not be a part of request!
            preparedStatement.setString(1, implementationInfo.getId());
            preparedStatement.setString(2, implementationInfo.getFilename());
            preparedStatement.setString(3, implementationInfo.getName());
            preparedStatement.setString(4, implementationInfo.getParentAlgorithmId());
            preparedStatement.setString(5, username == null ? "no user name" : username);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Insert algorithm statement has affected " + rowsAffected + " rows!");

            final ImplementationAddResponse implementationAddResponse;
            if (rowsAffected == 1) {
                // insert is good
                implementationAddResponse = ImplementationAddResponse.builder()
                        .statusCode(HttpStatus.SUCCESS.getValue())
                        .implementationInfo(implementationInfo)
                        .build();
            } else {
                // insert is not good
                implementationAddResponse = ImplementationAddResponse.builder()
                        .statusCode(HttpStatus.BAD_REQUEST.getValue())
                        .error("Rows were not affected!")
                        .build();
            }

            return implementationAddResponse;

        } catch (SQLException e) {
            e.printStackTrace();
            return ImplementationAddResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Could not execute a SQL statement!")
                    .build();
        }
    }
}
