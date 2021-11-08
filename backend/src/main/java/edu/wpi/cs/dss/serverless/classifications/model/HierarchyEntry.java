package edu.wpi.cs.dss.serverless.classifications.model;

import lombok.Value;

@Value
public class HierarchyEntry {
    String id;
    String name;
    String parentId;
    String typeName;
}
