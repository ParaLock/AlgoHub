package edu.wpi.cs.dss.serverless.classifications.model;

public class HierarchyEntry {

    public String id;
    public String name;
    public String parentId;
    public String typeName;

    public HierarchyEntry(String id, String name, String parentId, String typeName) {

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.typeName = typeName;
    }

}
