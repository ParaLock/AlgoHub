package edu.wpi.cs.dss.serverless.benchmarks.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import edu.wpi.cs.dss.serverless.benchmarks.model.Benchmark;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import lombok.Getter;
import java.util.ArrayList;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class BenchmarkGetByImplementationResponse extends GenericResponse {

    private ArrayList<Benchmark> benchmarks;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
