package server

import (
	"fmt"

	socketio "github.com/googollee/go-socket.io"
)

func StartServer() {
	server := socketio.NewServer(nil)
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		s.Emit("hello", "world")
		return nil
	})
}
