package edu.wpi.cs.dss.serverless.benchmarks.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
public class Benchmark {
    private String id;
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
    private String executionDate;
    private int memoryUsage;
    private String authorId;

    public Benchmark(
                        String id,
                        String implementationId,
                        String problemInstanceId,
                        int memory,
                        String cpuName,
                        int cpuThreads,
                        int cpuCores,
                        int cpuL1Cache,
                        int cpuL2Cache,
                        int cpuL3Cache,
                        int executionTime,
                        int memoryUsage,
                        String executionDate,
                        String authorId
                    )
    {
        this.id = id;
        this.implementationId = implementationId;
        this.problemInstanceId = problemInstanceId;
        this.memory = memory;
        this.cpuName = cpuName;
        this.cpuThreads = cpuThreads;
        this.cpuCores = cpuCores;
        this.cpuL1Cache = cpuL1Cache;
        this.cpuL2Cache = cpuL2Cache;
        this.cpuL3Cache = cpuL3Cache;
        this.executiontime = executionTime;
        this.memoryUsage = memoryUsage;
        this.authorId = authorId;
        this.executionDate = executionDate;
    }
}
