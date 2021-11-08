package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.Request;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationAddResponse;
import edu.wpi.cs.dss.serverless.classifications.model.ClassificationInfo;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;

public class ClassificationAddHandler implements RequestHandler<ClassificationAddRequest, ClassificationAddResponse> {

    private AmazonS3 s3 = null;
    LambdaLogger logger;
    java.sql.Connection conn;
    Random random = new Random();

    @Override
    public ClassificationAddResponse handleRequest(ClassificationAddRequest req, Context context) {
        logger = context.getLogger();
        logger.log("in classification handle request");
        logger.log(req.classificationInfo.name);

        ClassificationAddResponse response = null;

        try {
            logger.log("Connecting to db...\n");
            conn = DatabaseUtil.connect(logger);
            logger.log("Finished connecting to db...\n");

            ClassificationInfo classification = req.getClassificationInfo();

            logger.log("Prepare statement...\n");
            final String query = "INSERT INTO classification (classificationId, name, parentId) VALUES (?,?,?)";
            PreparedStatement ps = conn.prepareStatement(query);
            logger.log("new classification to be added ====> \n");
            logger.log("classification name: " + classification.getName() + "\n");
            logger.log("parent classification id: " + classification.getParentClassificationId() + "\n");
            ps.setString(1, classification.getId());
            ps.setString(2, classification.getName());
            ps.setString(3, classification.getParentClassificationId());

            int affectedRows = ps.executeUpdate();

            if (affectedRows != 1) {
                throw new SQLException("Creating classification failed, no rows affected.");
            }
            logger.log("new classification creation succeeded. " + affectedRows + " rows affected.");

            logger.log("new classification -> " + classification.toString());
            response = new ClassificationAddResponse(
                    classification.getId(),
                    "",
                    "200"
            );

        } catch (Exception e) {
            e.printStackTrace();
            response = new ClassificationAddResponse("classification creation failed");
        }

        return response;
    }
}
