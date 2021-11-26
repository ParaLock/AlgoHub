package edu.wpi.cs.dss.serverless.problemInstances.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.problemInstances.model.ProblemInstance;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.ArrayList;

@Getter
@Setter
@SuperBuilder
public class ProblemInstanceGetByAlgorithmResponse extends GenericResponse {

    ArrayList<ProblemInstance> problemInstances;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
