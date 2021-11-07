package edu.wpi.cs.dss.serverless.classifications.model;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class ClassificationInfo {

    public String id;
    public String name;
    public String parentClassificationId;

    public ClassificationInfo() {

    }

    public ClassificationInfo(String name, String parentClassificationId) {
        this.name = name;
        this.parentClassificationId = parentClassificationId;
        generateID();
    }

    public void generateID() {
        if (this.id == null || this.id.length() == 0) {
            this.id = UUID.randomUUID().toString();
        }
    }

    public String getName() {
        return this.name;
    }

    public String getParentClassificationId() {
        return this.parentClassificationId;
    }

//    public boolean setId(String id) {
//        if (this.id != null && this.id.length() > 0) {
//            return false;
//        }
//
//        this.id = id + "";
//        return true;
//    }

    public String getId() {
        return this.id;
    }

    public String toString() {
        return String.format("id: %s, name: %s, parentId: %s", this.id, this.name, this.parentClassificationId);
    }
}
