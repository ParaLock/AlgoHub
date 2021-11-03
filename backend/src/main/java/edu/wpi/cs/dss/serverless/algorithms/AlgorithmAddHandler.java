package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddResponse;

public class AlgorithmAddHandler implements RequestHandler<AlgorithmAddRequest,AlgorithmAddResponse> {

    LambdaLogger logger;

    @Override
    public AlgorithmAddResponse handleRequest(AlgorithmAddRequest algorithmAddRequest, Context context) {

        logger = context.getLogger();
        logger.log("AlgorithmAdd: username: " + algorithmAddRequest.getUserName());

        return new AlgorithmAddResponse();
    }
}
