package edu.wpi.cs.dss.serverless.problemInstances.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;

@Getter
@Setter
@AllArgsConstructor
public class ProblemInstance {

    private String id;
    private String datasetFilename;
    private int datasetSize;
    private String problemType;
    private String implementationId;
    private String authorId;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
