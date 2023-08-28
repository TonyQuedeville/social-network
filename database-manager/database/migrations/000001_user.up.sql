-- file: 000001_user.up.sql

-- Create the "user" table
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATETIME NOT NULL,
    sexe TEXT NOT NULL,
    image TEXT,
    pseudo TEXT,
    about TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    isConnected INTEGER DEFAULT 0
);

-- Create the trigger "set_nickname_default"
CREATE TRIGGER IF NOT EXISTS set_nickname_default
AFTER INSERT ON user
BEGIN
    UPDATE user
    SET pseudo = NEW.first_name
    WHERE id = NEW.id AND NEW.pseudo IS '';
END;

-- Create the trigger "update_at_user"
CREATE TRIGGER IF NOT EXISTS update_at_user
AFTER UPDATE ON user
BEGIN
    UPDATE user
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;
