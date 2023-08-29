package handler

import (
	"fmt"

	"github.com/TonyQuedeville/social-network/database-manager/structs/conv"
	socketio "github.com/googollee/go-socket.io"
)

func OnMessage(s socketio.Conn, message *conv.Message) {
	fmt.Printf("message: %v\n", message)
}
