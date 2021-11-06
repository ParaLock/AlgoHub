package edu.wpi.cs.dss.serverless.algorithms.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import lombok.Builder;
import lombok.SneakyThrows;
import lombok.Value;

@Value
@Builder
public class AlgorithmAddResponse {
    String error;
    Integer statusCode;
    AlgorithmInfo algorithmInfo;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
