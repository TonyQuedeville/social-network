-- file: 000004_temp_follower.down.sql

-- Drop the "remove_temp_follower" trigger

DROP TRIGGER IF EXISTS remove_temp_follower

-- Delete table the "temp_follower" temp_follower

DROP TABLE IF EXISTS temp_follower