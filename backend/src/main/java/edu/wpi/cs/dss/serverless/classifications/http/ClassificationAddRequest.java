package edu.wpi.cs.dss.serverless.classifications.http;

import edu.wpi.cs.dss.serverless.classifications.model.ClassificationInfo;

public class ClassificationAddRequest {
    public ClassificationInfo classificationInfo;

    public ClassificationAddRequest() {
        classificationInfo = new ClassificationInfo();
    }

    public ClassificationAddRequest(ClassificationInfo info) {
        classificationInfo = info;
    }

    public ClassificationInfo getClassificationInfo() {
        classificationInfo.generateID();
        return classificationInfo;
    }
}
