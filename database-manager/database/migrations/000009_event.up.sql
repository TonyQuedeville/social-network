-- Create the "EVENT" table
CREATE TABLE IF NOT EXISTS `event` (
    id INTEGER PRIMARY KEY UNIQUE,
    group_id INTEGER NOT NULL,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES "group"(id) ON DELETE CASCADE
);

-- Create the "going_event" table
CREATE TABLE IF NOT EXISTS `going_event` (
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    going BOOLEAN,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES "event"(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);
