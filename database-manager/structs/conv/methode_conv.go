package conv

// CREATE

// cree une conversation priver (user à user)
func CreatePrivateConv(admin_id uint64, conv_name string) {
}

// cree une conversation de group
func CreateGroupConv(admin_id uint64, conv_name string) {
}

// READ

// recupere les conversation d'un utilisateur
func GetConvByUserId(user_id uint64) (c []*Conv) {
	return
}

// UPDATE

// rajoute un ou des membres dans une conv de group
func AddMemberToGroupConv() {
}
