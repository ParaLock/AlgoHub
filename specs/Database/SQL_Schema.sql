CREATE TABLE Classification (
   classificationId VARCHAR(36) NOT NULL,
   parentId VARCHAR(36) NOT NULL,
   name VARCHAR(100) NOT NULL,
   PRIMARY KEY (classificationId)
);

CREATE TABLE Algorithm (
   algorithmId VARCHAR(36) NOT NULL,
   name VARCHAR(100) NOT NULL,
   description VARCHAR(255) NOT NULL,
   parentClassification VARCHAR(36) NOT NULL,
   authorId VARCHAR(36) NOT NULL,
   PRIMARY KEY (algorithmId),
   FOREIGN KEY (parentClassification) REFERENCES Classification (classificationId)
);

CREATE TABLE Implementation (
   implementationId VARCHAR(36) NOT NULL,
   sourceCodeFilename TEXT NOT NULL,
   name TEXT NOT NULL,
   parentAlgorithm VARCHAR(36) NOT NULL,
   authorId VARCHAR(36) NOT NULL,
   PRIMARY KEY (implementationId),
   FOREIGN KEY (parentAlgorithm) REFERENCES Algorithm (algorithmId)
);


CREATE TABLE ProblemInstance (
   problemInstanceId VARCHAR(36) NOT NULL,
   datasetFilename TEXT NOT NULL,
   datasetSize INT NOT NULL,
   problemType TEXT NOT NULL,
   parentAlgorithm VARCHAR(36) NOT NULL,
   authorId VARCHAR(36) NOT NULL,
   PRIMARY KEY (problemInstanceId),
   FOREIGN KEY (parentAlgorithm) REFERENCES Algorithm (algorithmId)
);

CREATE TABLE Benchmark (
   benchmarkId VARCHAR(36) NOT NULL,
   parentImplementation VARCHAR(36) NOT NULL,
   parentProblem VARCHAR(36) NOT NULL,
   executionTime DOUBLE NOT NULL,
   memoryUsage DOUBLE NOT NULL,
   cpuName TEXT NOT NULL,
   cpuNumThreads INT NOT NULL,
   cpuNumCores INT NOT NULL,
   cpuL1CacheSize INT NOT NULL,
   cpuL2CacheSize INT NOT NULL,
   cpuL3CacheSize INT NOT NULL,
   memorySize INT NOT NULL,
   dateRun TEXT NOT NULL,
   PRIMARY KEY (benchmarkId),
   FOREIGN KEY (parentImplementation) REFERENCES Implementation (implementationId),
   FOREIGN KEY (parentProblem) REFERENCES ProblemInstance (problemInstanceId)
);
