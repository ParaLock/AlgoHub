package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.Request;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddResponse;
import edu.wpi.cs.dss.serverless.classifications.model.HierarchyEntry;

import java.util.ArrayList;

public class ClassificationAddHandler implements RequestHandler<ClassificationAddRequest, ClassificationAddResponse> {

    private AmazonS3 s3 = null;

    LambdaLogger logger;

    @Override
    public ClassificationAddResponse handleRequest(ClassificationAddRequest req, Context context) {
        logger = context.getLogger();
        logger.log("test" + req.classificationInfo.name);

        return new ClassificationAddResponse("test123", "no error", "200");
    }
}
