package conv

import (
	"fmt"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// CREATE

func createConv(admin_id uint64, conv_name, type_ string) {
	err, _ := database.Database.Exec(`
	INSERT INTO 'conv' (admin_id, name, type)
	VALUES (?, ?, ?)
`, admin_id, conv_name, "private")
	if err != nil {
		fmt.Printf("err create conv: %v\n", err)
	}
}

// cree une conversation priver (user à user)
func CreatePrivateConv(admin_id uint64, conv_name string) {
	createConv(admin_id, conv_name, "private")
}

// cree une conversation de group
func CreateGroupConv(admin_id uint64, conv_name string) {
	createConv(admin_id, conv_name, "group")
}

// READ

// recupere les conversation d'un utilisateur
func GetConvByUserId(user_id uint64) (c []*Conv) {
	database.Database.Query(`
	SELECT * FROM conv 
	`)
	return
}

// UPDATE

// rajoute un ou des membres dans une conv de group
func AddMemberToGroupConv() {
}

// DELETE

// delet conv
func DeletConv(conv_id uint64) {
}
