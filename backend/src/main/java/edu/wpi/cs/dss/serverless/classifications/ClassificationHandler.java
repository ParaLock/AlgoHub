package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.Request;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationResponse;
import edu.wpi.cs.dss.serverless.classifications.model.HierarchyEntry;

import java.util.ArrayList;

public class ClassificationHandler implements RequestHandler<ClassificationRequest, ClassificationResponse> {

    private AmazonS3 s3 = null;

    LambdaLogger logger;

    @Override
    public ClassificationResponse handleRequest(ClassificationRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Loading Java Lambda handler of RequestHandler");

        ArrayList<HierarchyEntry> test = new ArrayList<>();

        return new ClassificationResponse();


    }
}
