
-- Remove everything from the database

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;



-- Create the tables

CREATE TABLE Availables(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot TIMESTAMP WITHOUT TIME ZONE UNIQUE NOT NULL
);

CREATE TABLE Reservations(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot TIMESTAMP WITHOUT TIME ZONE UNIQUE NOT NULL,
    email TEXT NOT NULL
);
