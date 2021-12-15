package edu.wpi.cs.dss.serverless.implementation.http;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.generic.GenericRemoveRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.implementation.ImplementationAddHandler;
import edu.wpi.cs.dss.serverless.implementation.ImplementationRemoveHandler;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ImplementationRemoveHandlerTest extends LambdaTest {

    void testSuccessInput(String incoming) throws IOException {
        ImplementationRemoveHandler handler = new ImplementationRemoveHandler();
        ImplementationRemoveRequest req = new Gson().fromJson(incoming,ImplementationRemoveRequest.class);
        GenericResponse response =  handler.handleRequest(req, createContext("remove"));
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(String incoming) throws IOException {
        ImplementationRemoveHandler handler = new ImplementationRemoveHandler();
        ImplementationRemoveRequest req = new Gson().fromJson(incoming, ImplementationRemoveRequest.class);
        GenericResponse response =  handler.handleRequest(req, createContext("remove"));



        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testSuccessInput(){
        String name = "Random sort";
        String author_id = "igrigolia";
        String extension = "py";
        String algorithm_id = "1bedd00f-68e5-48c2-8bca-624fc2fc425f";
        String algo_name = "radnom sort";
        String source_code  = "testBase64";


        ImplementationAddHandler handler = new ImplementationAddHandler();
        ImplementationAddRequest req = new ImplementationAddRequest();
        req.setName(name);
        req.setAuthorId(author_id);
        req.setExtension(extension);
        req.setAlgorithmId(algorithm_id);
        req.setAlgorithmName(algo_name);
        req.setSourceCodeBase64(source_code);
        ImplementationAddResponse response = (ImplementationAddResponse) handler.handleRequest(req, createContext("add"));

        ImplementationRemoveRequest req2 = new ImplementationRemoveRequest();
        req2.setId(response.getId());
        String input = new Gson().toJson(req2);

        try {
            testSuccessInput(input);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }

    @Test
    public void FailInput(){
        String id = "164dfed4-cf56-4124-a23232323237";
        ImplementationRemoveRequest req = new ImplementationRemoveRequest();
        req.setId(id);
        String input = new Gson().toJson(req);

        try {
            testFailInput(input);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }
}
