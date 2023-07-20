package user

import "time"

type User struct {
	Id         uint64    `json:"id,omitempty"`
	Email      string    `json:"email,omitempty"`
	Password   string    `json:"password,omitempty"`
	First_name string    `json:"firstname,omitempty"`
	Last_name  string    `json:"lastname,omitempty"`
	Born_date  time.Time `json:"born_date,omitempty"`
	Sexe       string    `json:"sexe,omitempty"`
	Status     string    `json:"status,omitempty"`
	Pseudo     string    `json:"pseudo,omitempty"`
	Image      string    `json:"image,omitempty"`
	About      string    `json:"about,omitempty"`
	Follower   []*User   `json:"follower"`
	Followed   []*User   `json:"followed"`
	Created_at time.Time `json:"created_date,omitempty"`
	Updated_at time.Time `json:"updated_date,omitempty"`
}
