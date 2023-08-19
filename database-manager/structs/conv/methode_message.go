package conv

// CREATE

// cree un nouveau message et le ralis a une conv
func CreateMesage(conv_id, user_id uint64, content string) {
}

// READ

// recupere le dernier message d'une conversation
func GetLastMessage(conv_id uint64) (m *Message) {
	return
}

// recupere tout les message d'une conv, mettre 0 a offset et start pour recuperer TOUT les messages
func GetMessageConv(conv_id, start, offset uint64) (ms []*Message) {
	return
}

// DELETE

// suprime un message par son id
func SupMessage(message_id uint64) {
}
