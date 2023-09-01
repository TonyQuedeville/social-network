package handler

import (
	"github.com/TonyQuedeville/social-network/database-manager/structs/conv"
	socketio "github.com/googollee/go-socket.io"
)

func OnMessage(s socketio.Conn, u_id, conv_id uint64, content string, online_user map[uint64]*socketio.Conn) {
	conv.CreateMesage(conv_id, u_id, content)
	BroadcastUpdateConvHead(online_user)
}
