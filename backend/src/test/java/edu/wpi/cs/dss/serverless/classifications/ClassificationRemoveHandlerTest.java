package edu.wpi.cs.dss.serverless.classifications;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.benchmarks.http.BenchmarkAddRequest;
import edu.wpi.cs.dss.serverless.benchmarks.http.BenchmarkAddResponse;
import edu.wpi.cs.dss.serverless.benchmarks.http.BenchmarkRemoveRequest;
import edu.wpi.cs.dss.serverless.classifications.ClassificationAddHandler;
import edu.wpi.cs.dss.serverless.classifications.ClassificationRemoveHandler;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddResponse;
import edu.wpi.cs.dss.serverless.generic.GenericRemoveRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.util.HttpStatus;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ClassificationRemoveHandlerTest extends LambdaTest {

    void testInput(String incoming, GenericResponse outgoing) throws IOException {
        ClassificationRemoveHandler handler = new ClassificationRemoveHandler();
        GenericRemoveRequest request = new Gson().fromJson(incoming, GenericRemoveRequest.class);
        GenericResponse response = handler.handleRequest(
                request, createContext("remove classification")
        );

        Assert.assertEquals(outgoing.getError(),null);
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testValidClassificationRemove() {
        // add before remove
        ClassificationAddHandler addHandler = new ClassificationAddHandler();
        ClassificationAddRequest addRequest = new ClassificationAddRequest();

        addRequest.setAuthorId("junit-test-authorId");
        addRequest.setName("valid-classification-name");
        addRequest.setParentId(null);

        ClassificationAddResponse addResponse = (ClassificationAddResponse) addHandler.handleRequest(
                addRequest, createContext("add")
        );
        Assert.assertTrue(addResponse.getId().length() > 0);
        Assert.assertEquals(new Integer(200), addResponse.getStatusCode());
        System.out.println("new classification created with id -> " + addResponse.getId());

        String sample_input = String.format("{\"id\": \"%s\"}", addResponse.getId());
        GenericResponse expected_output = GenericResponse.builder()
                .statusCode(HttpStatus.SUCCESS.getValue())
                .build();

        try {
            testInput(sample_input, expected_output);
        } catch (IOException ioe) {
            Assert.fail("Invalid remove classification:" + ioe.getMessage());
        }
    }
}
