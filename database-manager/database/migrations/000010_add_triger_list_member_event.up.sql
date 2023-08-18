-- file: 000010_event.up.sql


-- Create the trigger "fill_going_event_table_on_new_event"
CREATE TRIGGER IF NOT EXISTS fill_going_event_table_on_new_event
AFTER INSERT ON event
BEGIN
    UPDATE user
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;
END;
