package edu.wpi.cs.dss.serverless.algorithms;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmResponse;

public class AlgorithmHandler implements RequestHandler<AlgorithmRequest, AlgorithmResponse>{

    @Override
    public AlgorithmResponse handleRequest(AlgorithmRequest input, Context context) {
        return new AlgorithmResponse();
    }
}
