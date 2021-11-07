package edu.wpi.cs.dss.serverless.implementation;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationAddRequest;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationAddResponse;
import edu.wpi.cs.dss.serverless.implementation.model.ImplementationInfo;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ImplementationAddHandler implements RequestHandler<ImplementationAddRequest, ImplementationAddResponse> {

    @Override
    public ImplementationAddResponse handleRequest(ImplementationAddRequest request, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received an add implementation request from AWS Lambda: \n" + request);

        // extracting algorithm info from add algorithm request
        final String username = request.getUserName();
        final ImplementationInfo implementationInfo = request.getImplementationInfo();

        // creating a sql query
        final String query = "INSERT INTO Implementation (implementationId, sourceCodeFilename, name, parentAlgorithm, authorId) VALUES (?,?,?,?,?)";

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement preparedStatement = connection.prepareStatement(query)
        ) {
            logger.log("Successfully connected to db!");

            // TODO: id should be generated on the DB side! Also id should not be a part of request!
            preparedStatement.setString(1, implementationInfo.getId());
            preparedStatement.setString(2, implementationInfo.getFilename());
            preparedStatement.setString(3, implementationInfo.getName());
            preparedStatement.setString(4, implementationInfo.getParentAlgorithmId());
            preparedStatement.setString(5, username == null ? "no user name" : username);

            final int rowsAffected = preparedStatement.executeUpdate();
            logger.log("Insert algorithm statement has affected " + rowsAffected + " rows!");

            return ImplementationAddResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .implementationInfo(implementationInfo)
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log("Could not execute SQL statement ...");
            return ImplementationAddResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Could not execute SQL statement ...")
                    .build();
        }
    }
}
