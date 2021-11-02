package edu.wpi.cs.dss.serverless.classifications.http;

import edu.wpi.cs.dss.serverless.classifications.model.HierarchyEntry;

import java.util.ArrayList;

public class ClassificationHierarchyResponse {

    public ArrayList<HierarchyEntry> hierarchy;
    public int status;
    public String error;

    public ClassificationHierarchyResponse() {

        hierarchy = new ArrayList<HierarchyEntry>();
        error = "";
        status = 200;
    }

    public ClassificationHierarchyResponse(ArrayList<HierarchyEntry> hierarchy, int status, String err) {

        this.error = err;
        this.hierarchy = hierarchy;
        this.status = status;
    }
}
