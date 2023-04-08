
-- Remove everything from the database

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;


-- Create the tables

CREATE TABLE Account(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);
