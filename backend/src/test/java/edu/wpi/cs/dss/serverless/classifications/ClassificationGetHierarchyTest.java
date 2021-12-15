package edu.wpi.cs.dss.serverless.classifications;

import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddResponse;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationHierarchyRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationHierarchyResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class ClassificationGetHierarchyTest extends LambdaTest {
    void testInput(ClassificationHierarchyRequest incoming, ClassificationHierarchyResponse outgoing) throws IOException {
        ClassificationHierarchyHandler handler = new ClassificationHierarchyHandler();
        GenericResponse response = handler.handleRequest(
                incoming, createContext("get hierarchy")
        );

        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testValidClassificationGetHierarchy() {
        ClassificationHierarchyRequest  sample_input = new ClassificationHierarchyRequest();
        try {
            testInput(sample_input, null);
        } catch (IOException ioe) {
            Assert.fail("Invalid get classification hierarchy:" + ioe.getMessage());
        }
    }
}
