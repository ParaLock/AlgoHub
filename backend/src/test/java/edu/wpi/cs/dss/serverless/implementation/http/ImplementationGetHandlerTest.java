package edu.wpi.cs.dss.serverless.implementation.http;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.implementation.ImplementationGetHandler;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ImplementationGetHandlerTest extends LambdaTest {
    void testSuccessInput(String incoming,String name, String file_name, String algorithm_id, String author_id) throws IOException {
        ImplementationGetHandler handler = new ImplementationGetHandler();
        ImplementationGetRequest req = new Gson().fromJson(incoming, ImplementationGetRequest.class);
        ImplementationGetResponse response = (ImplementationGetResponse) handler.handleRequest(req, createContext("get"));

        Assert.assertEquals(req.getId(),response.getId());
        Assert.assertEquals(name,response.getProgrammingLanguage());
        Assert.assertEquals(author_id,response.getAuthorId());
        Assert.assertEquals(file_name,response.getFilename());
        Assert.assertEquals(algorithm_id,response.getAlgorithmId());
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(String incoming) throws IOException {
        ImplementationGetHandler handler = new ImplementationGetHandler();
        ImplementationGetRequest req = new Gson().fromJson(incoming, ImplementationGetRequest.class);
        GenericResponse response = handler.handleRequest(req, createContext("get"));

//        Assert.assertEquals(outgoing, response.result);
        Assert.assertEquals(new Integer(400), response.getStatusCode());
    }
    @Test
    public void testImplementationGet(){
        String id = "232e7599-fc29-4e55-b54d-e835555f3df8";

        ImplementationGetRequest req = new ImplementationGetRequest();
        req.setId(id);
        String input_id = new Gson().toJson(req);

        String file_name = "232e7599-fc29-4e55-b54d-e835555f3df8_insertion sort_java.java";
        String name = "Java";
        String algorithm_id = "1bedd00f-68e5-48c2-8bca-624fc2fc425f";
        String author_id = "Irakli";



        try {
            testSuccessInput(input_id,name,file_name,algorithm_id,author_id);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }

    @Test
    public void testFailInput(){
        String id = "16ac8e25-4";

        ImplementationGetRequest req = new ImplementationGetRequest();
        req.setId(id);
        String input_id = new Gson().toJson(req);

        try {
            testFailInput(input_id);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }

}
