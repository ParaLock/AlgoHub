package edu.wpi.cs.dss.serverless.classifications;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import edu.wpi.cs.dss.serverless.classifications.http.ClassificationMergeRequest;
import edu.wpi.cs.dss.serverless.generic.GenericResponse;
import edu.wpi.cs.dss.serverless.util.DataSource;
import edu.wpi.cs.dss.serverless.util.ErrorMessage;
import edu.wpi.cs.dss.serverless.util.HttpStatus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ClassificationMergeHandler implements RequestHandler<ClassificationMergeRequest, GenericResponse> {

    private LambdaLogger logger;

    @Override
    public GenericResponse handleRequest(ClassificationMergeRequest request, Context context) {
        logger = context.getLogger();
        logger.log("Received a merge classification request from AWS Lambda:\n" + request);

        final GenericResponse response = merge(request);
        logger.log("Sent a merge classification response to AWS Lambda:\n" + response);

        return response;
    }

    private GenericResponse merge(ClassificationMergeRequest request) {
        final String sourceId = request.getSourceId();
        final String targetId = request.getTargetId();

        final String updateClassificationsQuery = "UPDATE classification SET parent_id=? WHERE parent_id=?";
        final String countRelatedAlgorithmsQuery = "SELECT count(*) FROM algorithm WHERE classification_id=?";
        final String countRelatedClassificationsQuery = "SELECT count(*) FROM classification WHERE parent_id=?";
        final String updateAlgorithmsQuery = "UPDATE algorithm SET classification_id=? WHERE classification_id=?";

        try (final Connection connection = DataSource.getConnection(logger);
             final PreparedStatement updateAlgorithmsPreparedStatement = connection.prepareStatement(updateAlgorithmsQuery);
             final PreparedStatement updateClassificationsPreparedStatement = connection.prepareStatement(updateClassificationsQuery);
             final PreparedStatement countRelatedAlgorithmsPreparedStatement = connection.prepareStatement(countRelatedAlgorithmsQuery);
             final PreparedStatement countRelatedClassificationsPreparedStatement = connection.prepareStatement(countRelatedClassificationsQuery)
        ) {
            logger.log("Successfully connected to db!");

            final long relatedClassifications = countRelated(sourceId, countRelatedClassificationsPreparedStatement);
            logger.log("Amount of related classifications = " + relatedClassifications);

            final long relatedAlgorithms = countRelated(sourceId, countRelatedAlgorithmsPreparedStatement);
            logger.log("Amount of related algorithms = " + relatedAlgorithms);

            final int rowsAffected;
            if (relatedClassifications > 0 && relatedAlgorithms > 0) {
                updateClassificationsPreparedStatement.setString(1, targetId);
                updateClassificationsPreparedStatement.setString(2, sourceId);
                final int affectedClassifications = updateClassificationsPreparedStatement.executeUpdate();

                updateAlgorithmsPreparedStatement.setString(1, targetId);
                updateAlgorithmsPreparedStatement.setString(2, sourceId);
                final int affectedAlgorithms = updateAlgorithmsPreparedStatement.executeUpdate();

                rowsAffected = affectedClassifications + affectedAlgorithms;
            } else if (relatedClassifications > 0 && relatedAlgorithms == 0){
                updateClassificationsPreparedStatement.setString(1, targetId);
                updateClassificationsPreparedStatement.setString(2, sourceId);
                rowsAffected = updateClassificationsPreparedStatement.executeUpdate();
            } else {
                updateAlgorithmsPreparedStatement.setString(1, targetId);
                updateAlgorithmsPreparedStatement.setString(2, sourceId);
                rowsAffected = updateAlgorithmsPreparedStatement.executeUpdate();
            }

            logger.log("Merge classification statement has affected " + rowsAffected + " rows!");

            return GenericResponse.builder()
                    .statusCode(HttpStatus.SUCCESS.getValue())
                    .error("")
                    .build();

        } catch (SQLException e) {
            e.printStackTrace();
            logger.log(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue());
            return GenericResponse.builder()
                    .statusCode(HttpStatus.BAD_REQUEST.getValue())
                    .error(ErrorMessage.SQL_EXECUTION_EXCEPTION.getValue())
                    .build();
        }
    }

    private long countRelated(String id, PreparedStatement preparedStatement) throws SQLException {
        preparedStatement.setString(1, id);

        final long result;
        try (final ResultSet resultSet = preparedStatement.executeQuery()) {
            if (resultSet.next()) {
                result = resultSet.getLong(1);
            } else {
                result = 0L;
            }
        }

        return result;
    }
}
