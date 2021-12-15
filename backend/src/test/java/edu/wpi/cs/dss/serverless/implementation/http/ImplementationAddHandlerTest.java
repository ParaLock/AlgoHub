package edu.wpi.cs.dss.serverless.implementation.http;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.algorithms.AlgorithmAddHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmAddResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.implementation.ImplementationAddHandler;
import edu.wpi.cs.dss.serverless.implementation.ImplementationGetHandler;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ImplementationAddHandlerTest extends LambdaTest {

    void testSuccessInput(String incoming) throws IOException {
        ImplementationAddHandler handler = new ImplementationAddHandler();
        ImplementationAddRequest req = new Gson().fromJson(incoming, ImplementationAddRequest.class);
        ImplementationAddResponse response = (ImplementationAddResponse) handler.handleRequest(req, createContext("add"));

        ImplementationGetHandler handler2 = new ImplementationGetHandler();
        ImplementationGetRequest req2 = new ImplementationGetRequest(response.getId());

        ImplementationGetResponse response2 = (ImplementationGetResponse) handler2.handleRequest(req2, createContext("get"));

        Assert.assertEquals(response2.getId(),response.getId());

        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(String incoming) throws IOException {
        ImplementationAddHandler handler = new ImplementationAddHandler();
        ImplementationAddRequest req = new Gson().fromJson(incoming, ImplementationAddRequest.class);
        GenericResponse response = handler.handleRequest(req, createContext("add"));


        Assert.assertEquals(new Integer(400), response.getStatusCode());
    }


    @Test
    public void testSuccessInput(){
        String name = "Quick_Sort";
        String author_id = "igrigolia";
        String extension = "py";
        String algorithm_id = "1bedd00f-68e5-48c2-8bca-624fc2fc425f";
        String algo_name = "quick_sort";
        String source_code  = "testBase64";

        ImplementationAddRequest req = new ImplementationAddRequest(name,author_id,extension,algorithm_id,algo_name,source_code);
        String input = new Gson().toJson(req);

        try {
            testSuccessInput(input);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }

    @Test
    public void testFailInput() {
        String name = "Quick_Sort";
        String author_id = "Irakli";
        String extension = "java";
        String algorithm_id = "1bedd00f-68e5-48c2-8bca-23";
        String algo_name = "quick_sort";
        String source_code  = "testBase64";

        ImplementationAddRequest req = new ImplementationAddRequest(name,author_id,extension,algorithm_id,algo_name,source_code);
        String input = new Gson().toJson(req);

        try {
            testFailInput(input);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }

    }
}
