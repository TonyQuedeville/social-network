-- file: 000005_post.up.sql

-- Create the "post" table
CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY UNIQUE,
    user_id INTEGER NOT NULL,
    pseudo TEXT,
    status TEXT,
    title TEXT,
    content TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

