-- file: 000003_follower.up.sql

-- Create table the "follower" follower
CREATE TABLE IF NOT EXISTS follower (
	"id" INTEGER NOT NULL PRIMARY KEY,
	"user_id"	INTEGER NOT NULL,
	"follow_id"	INTEGER NOT NULL,
	"created_at"	DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE ("user_id", "follow_id"),
	FOREIGN KEY("user_id") REFERENCES "user"("id"),
	FOREIGN KEY("follow_id") REFERENCES "user"("id")
);
