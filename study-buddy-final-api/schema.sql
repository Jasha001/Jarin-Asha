-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

-- Create StudyGroups table
CREATE TABLE study_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20),
    description TEXT,
    creator_id INTEGER REFERENCES users(id)
);

-- Create Memberships table
CREATE TABLE memberships (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    study_group_id INTEGER REFERENCES study_groups(id),
    UNIQUE(user_id, study_group_id)
);
