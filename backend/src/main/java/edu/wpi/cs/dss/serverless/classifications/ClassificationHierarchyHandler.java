package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.Request;
import com.amazonaws.services.lambda.runtime.CognitoIdentity;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationHierarchyRequest;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationHierarchyResponse;
import edu.wpi.cs.dss.serverless.classifications.model.HierarchyEntry;
import edu.wpi.cs.dss.serverless.database.DatabaseUtil;
import org.apache.http.HeaderIterator;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class ClassificationHierarchyHandler implements RequestHandler<ClassificationHierarchyRequest, ClassificationHierarchyResponse> {

    private AmazonS3 s3 = null;

    LambdaLogger logger;
    java.sql.Connection conn;

    @Override
    public ClassificationHierarchyResponse handleRequest(ClassificationHierarchyRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Loading Java Lambda handler of RequestHandler\n");

        ClassificationHierarchyResponse response;

        try  {
            logger.log("Connecting to db...\n");
            conn = DatabaseUtil.connect(logger);
            logger.log("Finished connecting to db...\n");

            String query = "";
            query += "SELECT algorithmId AS id, parentClassification AS parentId, name, 'algorithm' AS type " +
                     "FROM Algorithm " +
                     "UNION " +
                     "SELECT classificationId AS id, parentId, name, 'classification' AS type  " +
                     "FROM Classification " +
                     "UNION " +
                     "SELECT implementationId as id, parentAlgorithm as parentId, name, 'implementation' AS type  " +
                     "FROM Implementation";

            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet resultSet = ps.executeQuery();

            ArrayList<HierarchyEntry> entries = new ArrayList<>();

            while (resultSet.next()) {

                String name  = resultSet.getString("name");
                String id = resultSet.getString("id");
                String type = resultSet.getString("type");
                String parentId = resultSet.getString("parentId");

                entries.add(new HierarchyEntry(id, name, parentId, type));
            }

            resultSet.close();
            ps.close();

            response = new ClassificationHierarchyResponse(entries, 200, "");

        } catch (Exception e) {
            e.printStackTrace();

            response = new ClassificationHierarchyResponse(new ArrayList<>(), 400, "Failed to connect to database.");

            conn = null;
        }

        return response;

    }
}
