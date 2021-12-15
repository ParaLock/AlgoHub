package edu.wpi.cs.dss.serverless.implementation.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;

@Getter
@Setter
@NoArgsConstructor
public class ImplementationAddRequest {

    private String name;
    private String authorId;
    private String extension;
    private String algorithmId;
    private String algorithmName;
    private String sourceCodeBase64;

    public ImplementationAddRequest(String name, String authorId, String extension, String algorithmId, String algoName, String sourceCode) {
        this.name = name;
        this.authorId = authorId;
        this.extension = extension;
        this.algorithmId = algorithmId;
        this.algorithmName = algoName;
        this.sourceCodeBase64 = sourceCode;
    }

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
