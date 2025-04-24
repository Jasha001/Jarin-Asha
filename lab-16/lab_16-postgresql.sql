-- lab_16-postgresql.sql
CREATE DATABASE lab_16;
\c lab_16
CREATE TABLE table1 (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);
INSERT INTO table1 (name) VALUES
  ('George'),
  ('Jerry'),
  ('Larry');
SELECT * FROM table1;
