-- file: 000011_event.up.sql

-- Create the trigger "delet_going_event"
CREATE TRIGGER IF NOT EXISTS delet_going_event
AFTER DELETE ON "event"
FOR EACH ROW
BEGIN
    DELETE FROM "going_event"
    WHERE event_id = OLD.id;
END;