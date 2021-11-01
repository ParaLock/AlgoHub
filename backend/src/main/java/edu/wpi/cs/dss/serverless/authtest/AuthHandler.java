package edu.wpi.cs.dss.serverless.authtest;

import com.amazonaws.Request;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.wpi.cs.dss.serverless.authtest.AuthRequest;
import edu.wpi.cs.dss.serverless.authtest.AuthResponse;
import jdk.internal.dynalink.support.NameCodec;

import java.util.Map;

public class AuthHandler implements RequestHandler<AuthRequest,AuthResponse> {

    private AmazonS3 s3 = null;

    LambdaLogger logger;

    @Override
    public AuthResponse handleRequest(AuthRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Loading Java Lambda handler of RequestHandler");
        logger.log(req.toString());

        CognitoIdentity identity = context.getIdentity();
        String uName = req.userName;
        logger.log("token" + uName);

        return new AuthResponse(uName, 200);
    }
}

