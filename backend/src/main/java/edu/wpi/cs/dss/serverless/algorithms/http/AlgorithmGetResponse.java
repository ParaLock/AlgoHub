package edu.wpi.cs.dss.serverless.algorithms.http;

import edu.wpi.cs.dss.serverless.algorithms.model.AlgorithmInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmGetResponse {

    private String error;
    private String status;
    private AlgorithmInfo algorithmInfo;
}
