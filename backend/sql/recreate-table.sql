
-- Remove everything from the database

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;



-- Create the tables

CREATE TABLE Availables(
    slot TIMESTAMP WITHOUT TIME ZONE PRIMARY KEY
);
