package edu.wpi.cs.dss.serverless.classifications.http;

public class ClassificationAddResponse {

    public String classificationId;
    public String error;
    public String status;

    public ClassificationAddResponse() {

        error = "";
        classificationId = "";
        status = "200";
    }

    public ClassificationAddResponse(String error) {
        this.error = error;
        this.status = "400";
        this.classificationId = "";
    }

    public ClassificationAddResponse(String classificationId, String error, String status) {

        this.classificationId = classificationId;
        this.error = error;
        this.status = status;
    }
}
