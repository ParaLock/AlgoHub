package edu.wpi.cs.dss.serverless.algorithms.http;

import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;

public class AlgorithmResponse {
    private AlgorithmInfo algorithmInfo;
    private String error;
    private String status;

    public AlgorithmResponse(AlgorithmInfo algorithmInfo, String error, String status) {

        this.algorithmInfo = algorithmInfo;
        this.error = error;
        this.status = status;
    }

    public AlgorithmResponse() {
        this.algorithmInfo = new AlgorithmInfo();
        this.error = "";
        this.status = "200";
    }

    public AlgorithmInfo getAlgorithmInfo() {
        return algorithmInfo;
    }

    public void setAlgorithmInfo(AlgorithmInfo algorithmInfo) {
        this.algorithmInfo = algorithmInfo;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
