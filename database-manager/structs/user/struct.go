package user

import "time"

type User struct {
	Id            uint64    `json:"id"`
	Email         string    `json:"email"`
	First_name    string    `json:"first_name"`
	Last_name     string    `json:"last_name"`
	Date_of_birth time.Time `json:"date_of_birth"`
	Sexe          string    `json:"Sexe"`
	Status        string    `json:"status"`
	Pseudo        string    `json:"pseudo"`
	Image         string    `json:"image"`
	About         string    `json:"about"`
	Follower      []uint64  `json:"follower"`
	Followed      []uint64  `json:"followed"`
	Created_at    time.Time `json:"created_at"`
	Updated_at    time.Time `json:"updated_at"`
}
