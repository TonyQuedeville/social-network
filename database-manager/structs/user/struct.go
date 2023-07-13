package user

import "time"

type User struct {
	Id         uint64    `json:"id,omitempty"`
	Email      string    `json:"email"`
	Password   string    `json:"password,omitempty"`
	First_name string    `json:"firstname"`
	Last_name  string    `json:"lastname"`
	Born_date  time.Time `json:"born_date"`
	Sexe       string    `json:"sexe"`
	Status     string    `json:"status"`
	Pseudo     string    `json:"pseudo"`
	Image      string    `json:"image"`
	About      string    `json:"about"`
	Follower   []uint64  `json:"follower,omitempty"`
	Followed   []uint64  `json:"followed,omitempty"`
	Created_at time.Time `json:"created_date,omitempty"`
	Updated_at time.Time `json:"updated_date,omitempty"`
}
