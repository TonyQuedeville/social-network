package server

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	midleware "github.com/TonyQuedeville/social-network/app-social-network/pkg/server"
	api "github.com/TonyQuedeville/social-network/app-ws-chat/pkg/api"
	"github.com/TonyQuedeville/social-network/database-manager/structs/conv"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
	socketio "github.com/googollee/go-socket.io"
)

var (
	database_users_id = make(map[uint64]string)
	socket_users_id   = make(map[string]uint64)
)

func StartServer() {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		sessionCk := func() string { // recupere le cookie "session"
			cks := s.RemoteHeader().Values("Cookie")
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
		socket_users_id[s.ID()] = u_id
		// s.Emit("message", "world")

		// Definir toute les route
		server.OnEvent("/", "message", func(s socketio.Conn, m *conv.Message) {
			api.OnMessage(s, m)
		})

		return nil
	})

	// server.OnEvent("/", "message", api.OnMessage)

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
