package event

import "time"

type Event struct {
	Id          uint64    `json:"id"`
	Group_id    uint64    `json:"group_id"`
	Date        time.Time `json:"date"`
	Titre       string    `json:"titre"`
	Description string    `json:"description"`
	Created_at  time.Time `json:"created_at"`
	Update_at   time.Time `json:"update_at"`
}
