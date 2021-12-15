package edu.wpi.cs.dss.serverless.algorithms.http;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.algorithms.AlgorithmAddHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddRequest;
import edu.wpi.cs.dss.serverless.generic.GenericRemoveRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;

import edu.wpi.cs.dss.serverless.algorithms.AlgorithmRemoveHandler;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class AlgorithmRemoveHandlerTest extends LambdaTest {

    void testSuccessInput(String incoming) throws IOException {
        AlgorithmRemoveHandler handler = new AlgorithmRemoveHandler();
        GenericRemoveRequest req = new Gson().fromJson(incoming, GenericRemoveRequest.class);
        GenericResponse response =  handler.handleRequest(req, createContext("remove"));
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(String incoming) throws IOException {
        AlgorithmRemoveHandler handler = new AlgorithmRemoveHandler();
        GenericRemoveRequest req = new Gson().fromJson(incoming, GenericRemoveRequest.class);
        GenericResponse response =  handler.handleRequest(req, createContext("remove"));



        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testSuccessInput(){
        String sample_name = "test algo";
        String description = "test algo desc";
        String classification_id = "1b53c044-5bb3-11ec-933c-16c4115dd1ff";
        String author_id = "john_smith_sr";

        AlgorithmAddRequest req = new AlgorithmAddRequest(sample_name, description, classification_id, author_id);
        AlgorithmAddHandler handler = new AlgorithmAddHandler();
        AlgorithmAddResponse response = (AlgorithmAddResponse) handler.handleRequest(req, createContext("add"));


        GenericRemoveRequest req2 = new GenericRemoveRequest(response.getId());
        String inp = new Gson().toJson(req2);

        try {
            testSuccessInput(inp);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }

    @Test
    public void FailInput(){
        String id = "16ac5";
        GenericRemoveRequest req = new GenericRemoveRequest(id);
        String input = new Gson().toJson(req);

        try {
            testFailInput(input);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }

}