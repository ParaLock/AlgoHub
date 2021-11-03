package edu.wpi.cs.dss.serverless.algorithms.model;

public class AlgorithmInfo {

    private String id;
    private String name;
    private String descriptions;
    private String authorId;
    private String parentClassificationId;

    public AlgorithmInfo(String id, String name, String descriptions, String authorId, String parentClassificationId) {
        this.id = id;
        this.name = name;
        this.descriptions = descriptions;
        this.authorId = authorId;
        this.parentClassificationId = parentClassificationId;
    }

    public AlgorithmInfo() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getParentClassificationId() {
        return parentClassificationId;
    }

    public void setParentClassificationId(String parentClassificationId) {
        this.parentClassificationId = parentClassificationId;
    }
}
