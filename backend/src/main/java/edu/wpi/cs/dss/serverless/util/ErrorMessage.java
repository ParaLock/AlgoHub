package edu.wpi.cs.dss.serverless.util;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public enum ErrorMessage {
    SQL_EXECUTION_EXCEPTION("Could not execute SQL statement ..."),
    RESOURCE_NOT_FOUND_EXCEPTION("Could not find a resource by the given id ..."),
    AWS_S3_UPLOAD_EXCEPTION("Could not upload an implementation to S3 bucket ..."),
    AWS_S3_DELETE_EXCEPTION("Could not delete an uploaded implementation from S3 bucket ..."),
    ALGORITHM_RECLASSIFICATION_EXCEPTION("Could not reclassify an algorithm by the given parameters ...");

    private final String value;
}
