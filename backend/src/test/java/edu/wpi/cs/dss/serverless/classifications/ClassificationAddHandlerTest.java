package edu.wpi.cs.dss.serverless.classifications;

import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ClassificationAddHandlerTest extends LambdaTest {
    void testInput(ClassificationAddRequest incoming, ClassificationAddResponse outgoing) throws IOException {
        ClassificationAddHandler handler = new ClassificationAddHandler();
        GenericResponse response = handler.handleRequest(
                incoming, createContext("add problem instance")
        );

        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    void testFailInput(ClassificationAddRequest incoming, ClassificationAddResponse outgoing) throws IOException {
        ClassificationAddHandler handler = new ClassificationAddHandler();
        GenericResponse response = handler.handleRequest(
                incoming, createContext("add")
        );

        Assert.assertEquals(new Integer(400), response.getStatusCode());
    }

    @Test
    public void testValidClassificationAdd() {
        ClassificationAddRequest sample_input = new ClassificationAddRequest();
        sample_input.setAuthorId("junit-test-authorId");
        sample_input.setName("valid-classification-name");
        sample_input.setParentId(null);

        try {
            testInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid get classification:" + ioe.getMessage());
        }
    }

    @Test
    public void testInvalidClassificationAdd() {
        ClassificationAddRequest sample_input = new ClassificationAddRequest();
        sample_input.setAuthorId("junit-test-authorId");
        sample_input.setName("valid-classification-name");
        sample_input.setParentId("non-existent-parent");

        try {
            testFailInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid get classification:" + ioe.getMessage());
        }
    }
}
