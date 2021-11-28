package edu.wpi.cs.dss.serverless.users;

import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.users.http.UserGetAllRequest;
import edu.wpi.cs.dss.serverless.users.http.UserGetAllResponse;
import edu.wpi.cs.dss.serverless.users.http.UserRemoveRequest;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;


import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.util.ArrayList;

public class UserGetAllHandler implements RequestHandler<UserGetAllRequest, UserGetAllResponse> {

    private LambdaLogger logger;

    @Override
    public UserGetAllResponse handleRequest(UserGetAllRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received an list users request from AWS Lambda:\n" + request);

        // save problem instance to the database
        final UserGetAllResponse response = listUsers(request);
        logger.log("Sent list users response to AWS Lambda:\n" + response);

        return response;
    }

    private UserGetAllResponse listUsers(UserGetAllRequest request) {

        AWSCognitoIdentityProvider provider = AWSCognitoIdentityProviderClientBuilder.defaultClient();

        try {

            String poolId = System.getenv("USER_POOL_ID");
            ListUsersRequest listRequest = new ListUsersRequest();
            listRequest.setUserPoolId(poolId);

            ArrayList<String> users = new ArrayList<String>();

            ListUsersResult response = provider.listUsers(listRequest);
            response.getUsers().forEach(user -> {
                        users.add(user.getUsername());
                    }
            );

            return UserGetAllResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .error("")
                    .users(users)
                    .build();

        } catch (Exception e){
            e.printStackTrace();

        }
        return UserGetAllResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.getValue())
                .error("Failed to retrieve user.")
                .build();
    }
}
