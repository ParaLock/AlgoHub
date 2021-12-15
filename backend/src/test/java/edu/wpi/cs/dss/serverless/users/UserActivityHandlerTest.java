package edu.wpi.cs.dss.serverless.users;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.benchmarks.BenchmarkGetByImplementationHandler;
import edu.wpi.cs.dss.serverless.benchmarks.http.BenchmarkGetByImplementationRequest;
import edu.wpi.cs.dss.serverless.benchmarks.http.BenchmarkGetByImplementationResponse;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.problemInstances.ProblemInstanceGetHandler;
import edu.wpi.cs.dss.serverless.problemInstances.http.ProblemInstanceGetRequest;
import edu.wpi.cs.dss.serverless.users.http.UserActivityRequest;
import edu.wpi.cs.dss.serverless.users.http.UserActivityResponse;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class UserActivityHandlerTest extends LambdaTest {


    void testInput(String incoming, String outgoing) throws IOException {
        UserActivityHandler handler = new UserActivityHandler();
        UserActivityRequest request = new Gson().fromJson(incoming, UserActivityRequest.class);
        UserActivityResponse response = (UserActivityResponse) handler.handleRequest(
                request, createContext("get user activities")
        );

        Assert.assertTrue(response.getActivity().size() > 0);
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testValidGetUserActivities() {
        String sample_input = "{\"authorId\": \"junit-test-authorId\",\"username\": \"junit-test-authorId\"}";

        try {
            testInput(sample_input, "");
        } catch (IOException ioe) {
            Assert.fail("Invalid get user activities:" + ioe.getMessage());
        }
    }

    void testFailInput(String incoming, String outgoing) throws IOException {
        UserActivityHandler handler = new UserActivityHandler();
        UserActivityRequest request = new Gson().fromJson(incoming, UserActivityRequest.class);
        UserActivityResponse response = (UserActivityResponse) handler.handleRequest(
                request, createContext("fail to get user activities")
        );

        Assert.assertTrue(response.getActivity().size() == 0);
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testInvalidGetUserActivities() {
        String sample_input = "{\"authorId\": \"bad-input\",\"username\": \"bad-input\"}";

        try {
            testFailInput(sample_input, "");
        } catch (IOException ioe) {
            Assert.fail("Invalid get user activities:" + ioe.getMessage());
        }
    }
}
