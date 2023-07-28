package group

import (
	"time"
)

type Group struct {
	Id          uint64    `json:"id,omitempty"`
	User_id     uint64    `json:"user_id,omitempty"`
	Admin       string    `json:"pseudo,omitempty"`
	Title       string    `json:"title,omitempty"`
	Description string    `json:"description,omitempty"`
	Image       string    `json:"image,omitempty"`
	Nb_members  uint64    `json:"nb_members,omitempty"`
	Members     []uint64  `json:"members"`
	WaitMembers []uint64  `json:"wait_members"`
	Created_at  time.Time `json:"created_date,omitempty"`
	Updated_at  time.Time `json:"updated_date,omitempty"`
}
