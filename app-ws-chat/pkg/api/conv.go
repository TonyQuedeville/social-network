package handler

import (
	"fmt"

	"github.com/TonyQuedeville/social-network/database-manager/structs/conv"
	socketio "github.com/googollee/go-socket.io"
)

// vient chercher la liste de conversation d'un utilisateur
func UpdateConvHead(s socketio.Conn, user_id uint64) {
	conv_heads := conv.GetAllHeadConvByUserId(user_id)
	s.Emit("update_convhead", conv_heads)
}

// vient chercher la liste de conversation de tout les utilisateur
func BroadcastUpdateConvHead(online_user map[uint64]*socketio.Conn) {
	for id, conn := range online_user {
		UpdateConvHead(*conn, id)
	}
}

// recupere les message d'une conversation
func OnGetMessageConvById(s socketio.Conn, conv_id uint64) {
	s.LeaveAll()
	messages := conv.GetMessageConv(conv_id, -1, -1) // recupere TOUT les message, sans ofset sans limit
	s.Emit("conv_content", messages)
	s.Join(fmt.Sprintf("conv_%v", conv_id))
}
