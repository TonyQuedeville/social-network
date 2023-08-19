package conv

import "time"

type Conv struct {
	Id             uint64  `json:""`
	Admin_id       uint64  `json:""`
	Name           string  `json:""`
	Type           string  `json:""`
	NbMessageNonLu int     `json:""`
	LastMessage    Message `json:""`
}

type Message struct {
	Id      uint64    `json:""`
	User_id uint64    `json:""`
	Conv_id uint64    `json:""`
	Content string    `json:""`
	Date    time.Time `json:""`
}
