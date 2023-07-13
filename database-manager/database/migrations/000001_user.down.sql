-- file: 000001_user.down.sql

-- Drop the trigger "set_nickname_default"
DROP TRIGGER IF EXISTS set_nickname_default;

-- Drop the trigger "update_at_user"
DROP TRIGGER IF EXISTS update_at_user;

-- Drop the "user" table
DROP TABLE IF EXISTS user;
