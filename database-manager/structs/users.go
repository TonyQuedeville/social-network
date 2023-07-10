package struct

import "time"

type User struct {
	Id            uint64    `json:"id"`
	Nickname      string    `json:"nickname"`
	Email         string    `json:"email"`
	First_name    string    `json:"first_name"`
	Last_name     string    `json:"last_name"`
	Date_of_birth time.Time `json:"date_of_birth"`
	Image         string    `json:"image"`
	About         string    `json:"about"`
	Status        bool      `json:"status"`
	Follower      []uint64  `json:"follower"`
	Follow        []uint64  `json:"follow"`
	Created_at    time.Time `json:"created_at"`
	Updated_at    time.Time `json:"updated_at"`
}
