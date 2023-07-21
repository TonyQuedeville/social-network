package comment

import (
	"time"
)

type Comment struct {
	Id         uint64    `json:"id,omitempty"`
	Post_id    uint64    `json:"post_id,omitempty"`
	User_id    uint64    `json:"user_id,omitempty"`
	Pseudo     string    `json:"pseudo,omitempty"`
	Content    string    `json:"content,omitempty"`
	Image      string    `json:"image,omitempty"`
	Created_at time.Time `json:"created_date,omitempty"`
	Updated_at time.Time `json:"updated_date,omitempty"`
}