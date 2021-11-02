package edu.wpi.cs.dss.serverless.database;

import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseUtil {

    public static String rdsMySqlDatabaseUrl;
    public static String dbUsername;
    public static String dbPassword;

    public final static String jdbcTag = "jdbc:mysql://";
    public final static String rdsMySqlDatabasePort = "3306";
    public final static String multiQueries = "?allowMultiQueries=true";

    public final static String dbName = "algohub";

    // pooled across all usages.
    static Connection conn;

    /**
     * Singleton access to DB connection to share resources effectively across multiple accesses.
     */
    public static Connection connect(LambdaLogger logger) throws Exception {
        if (conn != null) { return conn; }

        dbUsername = System.getenv("dbUsername");
        if (dbUsername == null) {
            logger.log("Environment variable dbUsername is not set!\n");
        }
        dbPassword = System.getenv("dbPassword");
        if (dbPassword == null) {
            logger.log("Environment variable dbPassword is not set!\n");
        }
        rdsMySqlDatabaseUrl = System.getenv("dbHost");
        if (rdsMySqlDatabaseUrl == null) {
            logger.log("Environment variable dbHost is not set!\n");
        }

        logger.log("DB: Successfully retrieved env vars.\n");

        try {
            logger.log("Getting mysql driver.\n");
            Class.forName("com.mysql.cj.jdbc.Driver");
            logger.log("Got driver successfully.\n");
            logger.log("Connecting to db.\n");
            conn = DriverManager.getConnection(
                    jdbcTag + rdsMySqlDatabaseUrl + ":" + rdsMySqlDatabasePort + "/" + dbName + multiQueries,
                    dbUsername,
                    dbPassword);
            logger.log("Connected to db successfully successfully.");
            return conn;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new Exception("Failed in database connection");
        }
    }
}
