package edu.wpi.cs.dss.serverless.implementation.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import edu.wpi.cs.dss.serverless.implementation.model.ImplementationInfo;
import lombok.Builder;
import lombok.SneakyThrows;
import lombok.Value;

@Value
@Builder
public class ImplementationGetResponse {
    String error;
    Integer statusCode;
    ImplementationInfo implementationInfo;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
