package edu.wpi.cs.dss.serverless.benchmarks.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;

@Getter
@Setter
@NoArgsConstructor
public class BenchmarkAddRequest {

    private String implementationId;
    private String problemInstanceId;
    private int memory;
    private String cpuName;
    private int cpuThreads;
    private int cpuCores;
    private int cpuL1Cache;
    private int cpuL2Cache;
    private int cpuL3Cache;
    private int executiontime;
    private int memoryUsage;
    private String authorId;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
