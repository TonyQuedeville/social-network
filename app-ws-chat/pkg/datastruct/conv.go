package datastruct

import "github.com/TonyQuedeville/social-network/database-manager/structs/user"

type Conv struct {
	Id       uint64
	Name     string
	Members  []*user.User
	Messages []*Message
	Image    string
}
