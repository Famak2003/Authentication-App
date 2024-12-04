CREATE DATABASE IF NOT EXISTS signup; -- "IF NOT EXISTS" it ensures that the command does not fail if the database already existed

USE signup;

DROP TABLE IF EXISTS login;

CREATE TABLE login (
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) DEFAULT NULL,
    email       VARCHAR(255) DEFAULT NULL,
    password    VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Patients_Email UNIQUE (email) -- This line makes sure that the email is unique, different patients should not have the same emails
)