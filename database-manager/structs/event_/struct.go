package event

import "time"

type Event struct {
	Id          uint64    `json:"id"`
	Group_id    uint64    `json:"group_id"`
	Titre       string    `json:"titre"`
	Description string    `json:"description"`
	Date        time.Time `json:"date"`
	Created_at  time.Time `json:"created_at"`
	Update_at   time.Time `json:"update_at"`
}
