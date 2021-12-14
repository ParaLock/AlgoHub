package edu.wpi.cs.dss.serverless.users.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserActivity {
    String id;
    String name;
    String typeName;
}
