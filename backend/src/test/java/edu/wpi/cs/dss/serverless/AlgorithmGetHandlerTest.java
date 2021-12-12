package edu.wpi.cs.dss.serverless;


import edu.wpi.cs.dss.serverless.algorithms.AlgorithmGetHandler;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetRequest;
import edu.wpi.cs.dss.serverless.algorithms.http.AlgorithmGetResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import org.junit.Assert;
import com.google.gson.Gson;
import org.junit.Test;

import java.io.IOException;

public class AlgorithmGetHandlerTest extends LambdaTest {

    void testInput(String incoming,String id, String name, String authorId, String description, String classificationId) throws IOException {
        AlgorithmGetHandler handler = new AlgorithmGetHandler();
        AlgorithmGetRequest req = new Gson().fromJson(incoming, AlgorithmGetRequest.class);
        AlgorithmGetResponse response = (AlgorithmGetResponse) handler.handleRequest(req, createContext("get"));

        Assert.assertEquals(id,response.getId());
        Assert.assertEquals(name,response.getName());
        Assert.assertEquals(authorId,response.getAuthorId());
        Assert.assertEquals(description,response.getDescription());
        Assert.assertEquals(classificationId,response.getClassificationId());
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(String incoming) throws IOException {
        AlgorithmGetHandler handler = new AlgorithmGetHandler();
        AlgorithmGetRequest req = new Gson().fromJson(incoming, AlgorithmGetRequest.class);
        GenericResponse response = handler.handleRequest(req, createContext("get"));

//        Assert.assertEquals(outgoing, response.result);
        Assert.assertEquals(new Integer(400), response.getStatusCode());
    }
//    @Test
//    public void testAlgorithmGet(){
//        String SAMPLE_INPUT_ID = "{\"id\":\"1\"}";
//
//        String SAMPLE_OUTPUT_ID2 = "1";
//        String SAMPLE_OUTPUT_NAME = "test";
//        String SAMPLE_OUTPUT_DESCRIPTION = "test";
//        String SAMPLE_OUTPUT_AUTHORRID = "test_user2";
//        String SAMPLE_OUTPUT_CLASSIFICATIONID = "4b7f7170-50b6-11ec-933c-16c4115dd1ff";
//
//
//        try {
//            testInput(SAMPLE_INPUT_ID,SAMPLE_OUTPUT_ID2,SAMPLE_OUTPUT_NAME,SAMPLE_OUTPUT_AUTHORRID,SAMPLE_OUTPUT_DESCRIPTION,SAMPLE_OUTPUT_CLASSIFICATIONID);
//        } catch (IOException ioe) {
//            Assert.fail("Invalid:" + ioe.getMessage());
//        }
//    }

}
