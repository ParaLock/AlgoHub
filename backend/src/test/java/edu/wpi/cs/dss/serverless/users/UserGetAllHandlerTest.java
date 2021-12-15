package edu.wpi.cs.dss.serverless.users;

import com.google.gson.Gson;
import edu.wpi.cs.dss.serverless.LambdaTest;
import edu.wpi.cs.dss.serverless.users.http.UserGetAllRequest;
import edu.wpi.cs.dss.serverless.users.http.UserGetAllResponse;
import org.junit.Assert;
import org.junit.Test;

import java.io.IOException;

public class UserGetAllHandlerTest extends LambdaTest {

    void testInput(String incoming, String outgoing) throws IOException {
        UserGetAllHandler handler = new UserGetAllHandler();
        UserGetAllRequest request = new Gson().fromJson(incoming, UserGetAllRequest.class);
        UserGetAllResponse response = (UserGetAllResponse) handler.handleRequest(
                request, createContext("get all users")
        );

        Assert.assertTrue(response.getUsers().size() > 0);
        Assert.assertEquals(new Integer(200), response.getStatusCode());
    }

    @Test
    public void testValidGetAllUsers() {
        String sample_input = "";

        try {
            testInput(sample_input, "");
        } catch (IOException ioe) {
            Assert.fail("Valid get all users:" + ioe.getMessage());
        }
    }
}
