package server

import (
	"fmt"
	"net/http"

	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
	ws "github.com/gorilla/websocket"
)

var users = make(map[uint64]*ws.Conn)

var update = make(chan []uint64)

func StartServer() {
	http.HandleFunc("/", websocketConection)
	go http.ListenAndServe(ADRESS, nil)

	// for u := range update {
	// 	for _, id := range u {
	// 		c, ok := users[id]
	// 		if !ok {
	// 			continue
	// 		}
	// 		// c.
	// 	}
	// }
}

var upgrader = ws.Upgrader{
	WriteBufferSize: 1024,
	ReadBufferSize:  1024,
}

func websocketConection(w http.ResponseWriter, r *http.Request) {
	// check for user cookie
	ck, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("err ck session: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Cookie 'session' missing")
		return
	}
	u_id := user.GetUserIdByUuid(ck.Value)
	if u_id == 0 {
		fmt.Printf("err for uuid: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Cookie 'session' expired")
		return
	}

	// upgrade connection to websocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("err upgrade: %v\n", err)
		return
	}
	defer func() {
		conn.Close()
		delete(users, u_id)
	}()

	users[u_id] = conn
	// ecoute la connection
	go read()
	write()
}

func read() {
}

func write() {
}
