package edu.wpi.cs.dss.serverless.classifications;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.classifications.http.*;
import edu.wpi.cs.dss.serverless.generic.GenericRemoveRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ClassificationMergeTest extends LambdaTest {
    void testInput(ClassificationMergeRequest incoming, GenericResponse outgoing) throws IOException {
        ClassificationMergeHandler handler = new ClassificationMergeHandler();
        GenericResponse response = handler.handleRequest(
                incoming, createContext("merge hierarchy")
        );

        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(ClassificationMergeRequest incoming, GenericResponse outgoing) throws IOException {
        ClassificationMergeHandler handler = new ClassificationMergeHandler();
        GenericResponse response = handler.handleRequest(
                incoming, createContext("merge hierarchy")
        );

        Assert.assertEquals(new Integer(400), response.getStatusCode());
    }

    public String createClassification(String parent) {

        String classification1Id = "";

        ClassificationAddHandler addHandler = new ClassificationAddHandler();
        ClassificationAddRequest addRequest = new ClassificationAddRequest();

        addRequest.setAuthorId("junit-test-authorId");
        addRequest.setName("valid-classification-name");
        addRequest.setParentId(parent);

        ClassificationAddResponse addResponse = (ClassificationAddResponse) addHandler.handleRequest(
                addRequest, createContext("add")
        );
        Assert.assertTrue(addResponse.getId().length() > 0);
        Assert.assertEquals(new Integer(200), addResponse.getStatusCode());

        classification1Id = addResponse.getId();

        return classification1Id;
    }

    @Test
    public void testValidClassificationMerge() {

        String classification1Id = createClassification(null);
        String classification2Id = createClassification(null);

        ClassificationMergeRequest  sample_input = new ClassificationMergeRequest();
        sample_input.setSourceId(classification1Id);
        sample_input.setSourceId(classification2Id);

        try {
            testInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid merge classification:" + ioe.getMessage());
        }
    }

    @Test
    public void testInvalidClassificationMerge() {

        String classification1Id = createClassification(null);
        String classification2Id = createClassification(classification1Id);

        ClassificationMergeRequest  sample_input = new ClassificationMergeRequest();
        sample_input.setSourceId(classification1Id);
        sample_input.setTargetId(classification2Id);

        try {
            testFailInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid merge classification:" + ioe.getMessage());
        }
    }
}
