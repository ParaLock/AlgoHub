package edu.wpi.cs.dss.serverless.classifications.http;

import edu.wpi.cs.dss.serverless.classifications.model.ClassificationInfo;

public class ClassificationResponse {

    public ClassificationInfo classificationInfo;
    public String status;
    public String error;

    public ClassificationResponse() {
        classificationInfo = new ClassificationInfo();
        status = "";
        error = "";
    }

    public ClassificationResponse(ClassificationInfo classificationInfo, String status, String error) {

        this.classificationInfo = classificationInfo;
        this.status = status;
        this.error = error;
    }
}
