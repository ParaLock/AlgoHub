package edu.wpi.cs.dss.serverless.implementation;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationGetRequest;
import edu.wpi.cs.dss.serverless.implementation.http.ImplementationGetResponse;
import edu.wpi.cs.dss.serverless.implementation.model.ImplementationInfo;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ImplementationGetHandler implements RequestHandler<ImplementationGetRequest, ImplementationGetResponse> {

    @Override
    public ImplementationGetResponse handleRequest(ImplementationGetRequest implementationGetRequest, Context context) {
        final LambdaLogger logger = context.getLogger();
        logger.log("Received a get implementation request from AWS Lambda: \n" + implementationGetRequest);

        // extracting implementation id from get implementation request
        final String id = implementationGetRequest.getId();

        //create a sql query
        final String query = "SELECT * FROM Implementation impl WHERE impl.implementationId = ?";

        // retrieve a connection
        final Connection connection;
        try {
            connection = DatabaseUtil.connect(logger);
        } catch (Exception e) {
            logger.log("Not able to retrieve a connection: " + e.getMessage());
            return ImplementationGetResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Not able to retrieve a connection")
                    .build();
        }

        try (final PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, id);

            final ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                final String filename = resultSet.getString(2);
                final String name = resultSet.getString(3);
                final String parentAlgId = resultSet.getString(4);
                final String authorId = resultSet.getString(5);

                final ImplementationInfo implementationInfo = new ImplementationInfo(id, name, filename, authorId, parentAlgId);
                return ImplementationGetResponse.builder()
                        .statusCode(HttpStatus.SUCCESS.getValue())
                        .implementationInfo(implementationInfo)
                        .build();
            }

            return ImplementationGetResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Could not find an implementation by the give id!")
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            return ImplementationGetResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error("Could not execute a SQL statement!")
                    .build();
        }
    }
}
