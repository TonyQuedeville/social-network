-- file: 000001_user_session.up.sql

-- Create the "user session" table
CREATE TABLE IF NOT EXISTS session (
    id INTEGER PRIMARY KEY UNIQUE,
    user_id INTEGER NOT NULL,
    uuid TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES user(id)
);

-- Create the triger "remove_old_session" 
CREATE TRIGGER IF NOT EXISTS remove_old_session
BEFORE INSERT ON session
BEGIN
    DELETE FROM session
    WHERE user_id = NEW.user_id;
END;
