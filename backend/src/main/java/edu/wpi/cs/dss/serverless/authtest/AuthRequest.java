package edu.wpi.cs.dss.serverless.authtest;

public class AuthRequest {

    public String token;

    public AuthRequest() {
        token = "";
    }

    public AuthRequest(String t) {
        token = t;
    }

}
