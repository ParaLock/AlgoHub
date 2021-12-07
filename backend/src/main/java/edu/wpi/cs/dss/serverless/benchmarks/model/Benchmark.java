package edu.wpi.cs.dss.serverless.benchmarks.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
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
    private String problemType;
    private int datasetSize;
}
