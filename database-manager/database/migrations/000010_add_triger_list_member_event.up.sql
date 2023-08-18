-- file: 000010_event.up.sql


-- Create the trigger "fill_going_event_table_on_new_event"
CREATE TRIGGER IF NOT EXISTS fill_going_event_table_on_new_event
AFTER INSERT ON "event"
BEGIN
    INSERT INTO "going_event" (event_id, user_id, going)
    SELECT NEW.id, gm.user_id, NULL
    FROM "groupmembers" gm
    WHERE gm.group_id = NEW.group_id;
END;