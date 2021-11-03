package edu.wpi.cs.dss.serverless.algorithms.http;

public class AlgorithmRequest {
    private String id;

    public AlgorithmRequest(String id) {
        this.id = id;
    }

    public AlgorithmRequest() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
