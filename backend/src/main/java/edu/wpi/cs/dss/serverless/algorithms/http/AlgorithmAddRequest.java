package edu.wpi.cs.dss.serverless.algorithms.http;

import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;

public class AlgorithmAddRequest {

    private AlgorithmInfo algorithmInfo;
    private String userName;

    public AlgorithmAddRequest(AlgorithmInfo algorithmInfo, String userName) {
        this.algorithmInfo = algorithmInfo;
        this.userName = userName;
    }

    public AlgorithmAddRequest() {
        this.algorithmInfo = new AlgorithmInfo();
        this.userName = "";
    }

    public AlgorithmInfo getAlgorithmInfo() {
        return algorithmInfo;
    }

    public void setAlgorithmInfo(AlgorithmInfo algorithmInfo) {
        this.algorithmInfo = algorithmInfo;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
