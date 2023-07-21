-- file: 000004_temp_follower.up.sql

-- Create table the "temp_follower" temp_follower

CREATE TABLE IF NOT EXISTS temp_follower (
    "user_id"	INTEGER NOT NULL,
	"follow_id"	INTEGER NOT NULL,
	"created_at"	DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("user_id", "follow_id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id"),
	FOREIGN KEY("follow_id") REFERENCES "user"("id"),
	PRIMARY KEY("follow_id")
);


-- Create the trigger "remove_temp_follower" 
CREATE TRIGGER IF NOT EXISTS remove_temp_follower
AFTER INSERT ON follower
BEGIN
    DELETE FROM temp_follower
    WHERE user_id = NEW.user_id AND follow_id = NEW.follow_id;
END;
