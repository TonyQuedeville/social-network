package server

import (
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func Test() {
	server := socketio.NewServer(nil)

	// Configurer les en-têtes CORS
	server.OnConnect("/", func(s socketio.Conn) error {
		log.Println("Client connected:", s.ID())
		// Autoriser toutes les origines
		s.SetContext("")
		return nil
	})

	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
		log.Println("Message received:", msg)
		// Vous pouvez émettre une réponse au client ici si nécessaire
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		log.Println("Client disconnected:", s.ID())
	})

	http.Handle("/socket.io/", cors(server))
	// http.Handle("/", cors(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// })))
	log.Println("Server is running at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Autoriser toutes les origines
		// w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5501")
		// w.Header().Set("Access-Control-Allow-Credentials", "true")
		// w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		// w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")
		// if r.Method == "OPTIONS" {
		// 	w.WriteHeader(http.StatusOK)
		// 	return
		// }
		// next.ServeHTTP(w, r)*
		// If it's a preflight request, just return without calling the next handler
		if r.Method == "OPTIONS" {
			w.Header().Set("Content-Type", "text/plain")
			w.Header().Set("Access-Control-Allow-Origin", "*") // A CHANGER POUR UN POTENTIEL DEPLOIMENT
			w.Header().Set("Access-Control-Allow-Credentials", "false")
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // A CHANGER POUR UN POTENTIEL DEPLOIMENT

		// Allow the use of credentials (like cookies) in the requests
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		next.ServeHTTP(w, r)
	})
}
