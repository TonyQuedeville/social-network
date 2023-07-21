-- file: 000007_group.up.sql

-- Create the "group" table
CREATE TABLE IF NOT EXISTS group (
    id INTEGER PRIMARY KEY UNIQUE,
    user_id INTEGER NOT NULL,
    admin TEXT, -- Pseudo du l'initiateur du groupe
    title TEXT,
    description TEXT,
    image TEXT,
    nb_members INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

