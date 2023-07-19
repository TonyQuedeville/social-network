-- file: 000003_follower.up.sql

-- Create table the "follower" follower
CREATE TABLE IF NOT EXISTS follower (
    user_id INTEGER NOT NULL,
    follow_id INTEGER PRIMARY KEY UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES user(id)
    FOREIGN KEY(follow_id) REFERENCES user(id)
);
