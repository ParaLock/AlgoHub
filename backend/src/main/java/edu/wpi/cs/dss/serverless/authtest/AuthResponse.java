package edu.wpi.cs.dss.serverless.authtest;

public class AuthResponse {
    public String email;
    public String username;
    public String userId;
    public int statusCode;
    public String error;

    public AuthResponse (String mail, String uname, String userId, int statusCode) {
        this.email = mail;
        this.username = uname;
        this.userId = userId;
        this.statusCode = statusCode;
        this.error = "";
    }

    public AuthResponse (int statusCode, String errorMessage) {
        this.email = "";
        this.username = "";
        this.userId = "";
        this.statusCode = statusCode;
        this.error = errorMessage;
    }
}

