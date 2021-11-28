package edu.wpi.cs.dss.serverless.classifications.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;

@Getter
@Setter
@NoArgsConstructor
public class ClassificationMergeRequest {

    private String sourceId; // tlc 1
    private String targetId; // tlc 2
    // 1 option result of tlc1 to tlc2 is tlc1 becomes a child of tlc2
    // 2 option result of tlc1 to tlc2 is children of tlc1 become children of tlc2, and tlc1 is empty

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
