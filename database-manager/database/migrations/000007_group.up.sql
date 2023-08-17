-- file: 000007_group.up.sql

-- Create the "group" table
CREATE TABLE IF NOT EXISTS `group` (
    id INTEGER PRIMARY KEY UNIQUE,
    user_id INTEGER NOT NULL,
    admin TEXT,
    title TEXT,
    description TEXT,
    image TEXT,
    nb_members INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY("user_id") REFERENCES "user"("id")
);


-- Create the "groupmembers" table
CREATE TABLE IF NOT EXISTS `groupmembers` (
    id INTEGER PRIMARY KEY UNIQUE,
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status TEXT DEFAULT 'wait',
	UNIQUE (group_id, user_id),
    FOREIGN KEY("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
    FOREIGN KEY("group_id") REFERENCES "group"("id") ON DELETE CASCADE
);
