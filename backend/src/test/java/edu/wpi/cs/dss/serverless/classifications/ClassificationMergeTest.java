package edu.wpi.cs.dss.serverless.classifications;

import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.classifications.http.*;
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

    @Test
    public void testValidClassificationMerge() {
        ClassificationMergeRequest  sample_input = new ClassificationMergeRequest();
        try {
            testInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid merge classification:" + ioe.getMessage());
        }
    }
}
