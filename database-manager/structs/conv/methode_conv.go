package conv

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

// CREATE

func createConv(admin_id uint64, conv_name, type_, image string) (conv_id uint64, err error) {
	_result, err := database.Database.Exec(`
	INSERT INTO 'conv' (admin_id, name, type, image)
	VALUES (?, ?, ?, ?)
`, admin_id, conv_name, type_, image)
	if err != nil {
		return
	}
	last, err := _result.LastInsertId()
	if err != nil {
		return
	}
	return uint64(last), nil
}

// cree une conversation priver (user à user)
func CreatePrivateConv(admin_id, other_id uint64) (uint64, error) {
	user1_image, user1_pseudo := user.GetImageAndPseudoUserId(admin_id)
	user2_image, user2_pseudo := user.GetImageAndPseudoUserId(other_id)
	id, err := createConv(admin_id, "private_conv_"+user1_pseudo+"_AND_"+user2_pseudo, "private", "")
	AddMemberToGroupConv(id, admin_id, user2_pseudo, user2_image)
	AddMemberToGroupConv(id, other_id, user1_pseudo, user1_image)
	return id, err
}

// cree une conversation de group
func CreateGroupConv(admin_id uint64, conv_name, image string) (uint64, error) {
	id, err := createConv(admin_id, conv_name, "group", image)
	AddMemberToGroupConv(id, admin_id, "", "")
	return id, err
}

// READ

// recupere les conversation d'un utilisateur
func GetAllHeadConvByUserId(user_id uint64) (cs []*ConvHeader) {
	rows, _ := database.Database.Query(CONV_HEAD+`
		WHERE cm.user_id = ?
	`, user_id)
	for rows.Next() {
		c := &ConvHeader{}
		rows.Scan(&c.Id, &c.Name, &c.Image, &c.Type, &c.NbMessageNonLu)
		c.LastMessage = GetLastMessage(c.Id)
		cs = append(cs, c)
	}
	return
}

// UPDATE

// rajoute un ou des membres dans une conv de group
func AddMemberToGroupConv(conv_id, user_id uint64, conv_alias, image_alias string) {
	nilifi := func(t string) *string {
		if t == "" {
			return nil
		} else {
			return &t
		}
	}
	database.Database.Exec(`
	INSERT INTO conv_member (conv_id, user_id, conv_alias, image_alias)
	VALUES (?, ?, ?, ?)
	`, conv_id, user_id, nilifi(conv_alias), nilifi(image_alias))
}

// DELETE

// delet conv NON FONCTIONELLE
func DeletConv(conv_id uint64) {
	database.Database.Exec(`
	DELETE FROM conv 
	WHERE id = ?
	`, conv_id)
}
