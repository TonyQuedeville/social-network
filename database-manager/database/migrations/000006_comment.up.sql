-- file: 000006_comment.up.sql

-- Create the "comment" table
CREATE TABLE IF NOT EXISTS comment (
    id INTEGER PRIMARY KEY UNIQUE,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    pseudo TEXT,
    content TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

