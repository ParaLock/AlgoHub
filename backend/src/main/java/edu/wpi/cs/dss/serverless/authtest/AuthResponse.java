package edu.wpi.cs.dss.serverless.authtest;

public class AuthResponse {
    public String userName;
    public int statusCode;
    public String error;

    public AuthResponse (String uname, int statusCode) {
        this.userName = uname;
        this.statusCode = statusCode;
        this.error = "";
    }

    public AuthResponse (int statusCode, String errorMessage) {
        this.userName = "";
        this.statusCode = statusCode;
        this.error = errorMessage;
    }
}

