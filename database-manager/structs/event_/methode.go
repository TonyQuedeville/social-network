package event

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// CRUD

// CREATE
func (e *Event) CreateEvent() error {
	_, err := database.Database.Exec(`
	INSERT INTO 'event'
	(
		group_id,
		titre,
		description,
		date
	)
	VALUES
	(?, ?, ?, ?)
`, e.Group_id, e.Titre, e.Description, e.Date)
	return err
}

// Read

func ReadEventByGroupId(group_id uint64) (e []*Event) {
	rows, _ := database.Database.Query(`
	SELECT *
	FROM 'event'
	WHERE group_id = ?
	`, group_id)
	for rows.Next() {
		ev := &Event{}
		rows.Scan(
			&ev.Id,
			&ev.Group_id,
			&ev.Date,
			&ev.Titre,
			&ev.Description,
			&ev.Created_at,
			&ev.Update_at,
		)
		e = append(e, ev)
	}
	return
}

// UPDATE

// DELETE
func DeleteEventById(event_id uint64) {
	database.Database.Exec(`
	DELETE FROM 'event'
	WHERE id = ?;
	`, event_id)
}

// GOING / NOT GOING

func (e *Event) GoingEvent(user_id uint64, going bool) string {
	_, err := database.Database.Exec(`
	INSERT INTO 'going_event'
	(
		event_id,
		user_id,
		going
	)
	VALUES
	(?, ?, ?)
	`, e.Id, user_id, going)
	if err != nil {
		return err.Error()
	}
	return "going sucess"
}

func (e *Event) UnGoingEvent(user_id uint64) string {
	_, err := database.Database.Exec(`
	DELETE FROM 'going_event'
	WHERE event_id = ?, user_id= ?,
	`, e.Id, user_id)
	if err != nil {
		return err.Error()
	}
	return "ungoing sucess"
}