-- file: 000001_user_session.down.sql


-- Drop the triger "remove_old_session" 
DROP TRIGGER IF EXISTS remove_old_session;

-- Drop the "user session" table
DROP TABLE IF EXISTS session