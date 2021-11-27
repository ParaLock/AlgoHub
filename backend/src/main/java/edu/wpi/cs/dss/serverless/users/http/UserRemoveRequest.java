package edu.wpi.cs.dss.serverless.users.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
public class UserRemoveRequest {

    String authorId;
    String id;

    @Override
    @SneakyThrows
    public String toString() {
        final ObjectWriter objectWriter = new ObjectMapper().writerWithDefaultPrettyPrinter();
        return objectWriter.writeValueAsString(this);
    }
}
