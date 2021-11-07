package edu.wpi.cs.dss.serverless.implementation.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImplementationAddRequest {

    private String name;
    private String authorId;
    private String extension;
    private String algorithmId;
    private String algorithmName;
    private String sourceCodeBase64;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
