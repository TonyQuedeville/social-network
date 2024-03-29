package post

import (
	"time"
	// user "github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

type Post struct {
	Id           uint64    `json:"id,omitempty"`
	Group_id     uint64    `json:"group_id,omitempty"`
	User_id      uint64    `json:"user_id,omitempty"`
	Pseudo       string    `json:"pseudo,omitempty"`
	Status       string    `json:"status,omitempty"`
	Title        string    `json:"title,omitempty"`
	Content      string    `json:"content,omitempty"`
	Image        string    `json:"image,omitempty"`
	Private_list []uint64  `json:"private_list"`
	Created_at   time.Time `json:"created_date,omitempty"`
	Updated_at   time.Time `json:"updated_date,omitempty"`
}

type PostPrivateList struct {
	Id      uint64 `json:"id,omitempty"`
	Post_id uint64 `json:"post_id,omitempty"`
	User_id uint64 `json:"user_id,omitempty"`
}
