package user

import (
	"time"

	group "github.com/TonyQuedeville/social-network/database-manager/structs/group_"
)

type User struct {
	Id                  uint64         `json:"id,omitempty"`
	Email               string         `json:"email,omitempty"`
	Password            string         `json:"password,omitempty"`
	First_name          string         `json:"firstname,omitempty"`
	Last_name           string         `json:"lastname,omitempty"`
	Born_date           time.Time      `json:"born_date,omitempty"`
	Sexe                string         `json:"sexe,omitempty"`
	Status              string         `json:"status,omitempty"`
	Pseudo              string         `json:"pseudo,omitempty"`
	Image               string         `json:"image,omitempty"`
	About               string         `json:"about,omitempty"`
	Follower            []*User        `json:"follower"`
	Followed            []*User        `json:"followed"`
	Groups_members      []*group.Group `json:"groups_members"`
	Wait_groups_members []*group.Group `json:"wait_groups_members"`
	Invit_groups        []*group.Group `json:"invit_groups"`
	Created_at          time.Time      `json:"created_date,omitempty"`
	Updated_at          time.Time      `json:"updated_date,omitempty"`
	IsConnected			bool		   `json:"isConnected"`
}
