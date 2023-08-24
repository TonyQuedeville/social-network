-- file: 000012_event.up.sql

CREATE TABLE IF NOT EXISTS conv (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    admin_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY(admin_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS message (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    conv_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY(conv_id) REFERENCES conv(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conv_member (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    conv_id INTEGER NOT NULL,
    nb_no_read_msg INTEGER NOT NULL DEFAULT 0,
    conv_alias TEXT,
    image_alias TEXT,
    UNIQUE(user_id, conv_id),
    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY(conv_id) REFERENCES conv(id) ON DELETE CASCADE
);

-- Create the trigger "update_nb_no_read_msg"
CREATE TRIGGER update_nb_no_read_msg
AFTER INSERT ON message
FOR EACH ROW
BEGIN
    UPDATE conv_member
    SET nb_no_read_msg = nb_no_read_msg + 1
    WHERE conv_id = NEW.conv_id AND NEW.user_id != user_id ;
END;

