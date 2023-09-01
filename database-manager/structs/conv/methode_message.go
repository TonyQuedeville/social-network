package conv

import (
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// CREATE

// cree un nouveau message et le ralis a une conv
func CreateMesage(conv_id, user_id uint64, content string) {
	database.Database.Exec(`
	INSERT INTO 'message' (user_id, conv_id, content, date) VALUES (?, ?, ?, ?)
	`, user_id, conv_id, content, time.Now())
}

// READ

// recupere le dernier message d'une conversation
func GetLastMessage(conv_id uint64) (m *Message) {
	m = &Message{}
	err := database.Database.QueryRow(MESSAGE+`
	WHERE m.conv_id = ?
	ORDER BY m.date DESC
	LIMIT 1;
	`, conv_id).
		Scan(&m.Id, &m.User_id, &m.Conv_id, &m.User_name, &m.User_image, &m.Content, &m.Date)
	if err != nil {
		m = nil
	}
	return
}

// recupere les derniers message non lu d'une conv suivant l'utilisateur
func GetNewLastMessages(conv_id, user_id uint64) (ms []*Message) {
	rows, _ := database.Database.Query(MESSAGE+`
	WHERE m.conv_id = ?
	ORDER BY m.date DESC
	LIMIT (SELECT nb_no_read_msg FROM conv_member WHERE user_id = ?);
	`, conv_id, user_id)
	for rows.Next() {
		m := &Message{}
		rows.Scan(&m.Id, &m.User_id, &m.Conv_id, &m.User_name, &m.User_image, &m.Content, &m.Date)
		ms = append(ms, m)
	}
	ResetNewNbMessage(user_id)
	return
}

// recupere tout les message d'une conv, mettre -1 a offset et limit pour ignorer la contrainte
func GetMessageConv(conv_id uint64, ofset, limit int64) (ms []*Message) {
	rows, _ := database.Database.Query(MESSAGE+`
	WHERE m.conv_id = ?
	ORDER BY m.date DESC
	LIMIT ? OFFSET ?;
	`, conv_id, limit, ofset)
	for rows.Next() {
		m := &Message{}
		rows.Scan(&m.Id, &m.User_id, &m.Conv_id, &m.User_name, &m.User_image, &m.Content, &m.Date)
		ms = append(ms, m)
	}
	return
}

// UPDATE

func ResetNewNbMessage(user_id uint64) {
	database.Database.Exec(`
	UPDATE conv_member SET nb_no_read_msg = 0
	WHERE user_id = ?
	`, user_id)
}

// DELETE

// suprime un message par son id
func SupMessage(message_id uint64) {
	database.Database.Exec(`
	DELETE FROM message 
	WHERE id = ?
	`, message_id)
}
