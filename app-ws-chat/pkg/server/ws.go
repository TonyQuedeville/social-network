package server

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	midleware "github.com/TonyQuedeville/social-network/app-social-network/pkg/server"
	api "github.com/TonyQuedeville/social-network/app-ws-chat/pkg/api"
	"github.com/TonyQuedeville/social-network/database-manager/structs/conv"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
	socketio "github.com/googollee/go-socket.io"
)

var (
	database_users_id = make(map[uint64]string)
	socket_users_id   = make(map[string]uint64)
	conn_users_id     = make(map[uint64]*socketio.Conn)
)

func StartServer() {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		sessionCk := func() string { // recupere le cookie "session"
			if len(s.RemoteHeader().Values("Cookie")) == 0 {
				return ""
			}
			cks := strings.Split(s.RemoteHeader().Values("Cookie")[0], "; ")
			for _, rawck := range cks {
				ck := strings.Split(rawck, "=")
				if ck[0] == "session" {
					return ck[1]
				}
			}
			return ""
		}()
		u_id := user.GetUserIdByUuid(sessionCk) // recupere id de l'user
		if u_id == 0 {
			return errors.New("auth failed")
		}

		s.SetContext("") // init socket ctx
		// fmt.Println("Client id connect: ", s.ID())

		// lier l'id socket a l'id en database
		database_users_id[u_id] = s.ID()
		conn_users_id[u_id] = &s
		socket_users_id[s.ID()] = u_id

		// envois la liste des conv a la connection
		go func() {
			if s != nil {
				time.Sleep(1 * time.Second)
				api.UpdateConvHead(s, u_id)
				s.Emit("user_info", user.GetUserById(u_id, u_id))
			}
		}()
		return nil
	})

	// cree un nouveau message
	server.OnEvent("/", "message", func(s socketio.Conn, c_id uint64, content string) {
		u_id := socket_users_id[s.ID()]
		api.OnMessage(s, u_id, c_id, content, conn_users_id)

		m := conv.GetLastMessage(c_id)
		server.BroadcastToRoom("/", fmt.Sprintf("conv_%v", c_id), "message", m)
	})

	// recupere tout les mesage d'une conv par son id
	server.OnEvent("/", "join_conv", api.OnGetMessageConvById)

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("Client id disconnect: ", s.ID(), "reason:", reason)
		// suprime le lien entre l'id socket et database
		u_id := socket_users_id[s.ID()]
		delete(socket_users_id, s.ID())
		delete(database_users_id, u_id)
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		// fmt.Println("WS error (socket.id:", s, "):", e)
	})

	go server.Serve()    // lance le serveur websocket
	defer server.Close() // ferme serveur websocket a l'aret du programe

	http.Handle("/socket.io/", corsMiddleware(midleware.CheckSession(server))) // définit la le endpoint de conection ws
	log.Printf("Serving at localhost%v...\n", ADRESS)
	log.Fatal(http.ListenAndServe(ADRESS, nil)) // lance le serveur http
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5501") // autoriser les CORS
		w.Header().Set("Access-Control-Allow-Credentials", "true")             // autoriser les crédential, cookie ect
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if r.Method == http.MethodOptions { // ne pas oublier le handle de la methode option
			w.WriteHeader(http.StatusNoContent)
			return
		}

		delete(r.Header, "Origin") // Je sais pas pourquoi mais sans ça ne marche pas

		next.ServeHTTP(w, r)
	})
}
