// package main

// import (
// 	"github.com/TonyQuedeville/social-network/app-ws-chat/pkg/server"
// 	"github.com/TonyQuedeville/social-network/database-manager/database"
// )

// func main() {
// 	database.OpenDatabase()
// 	defer database.CloseDatabase()
// 	server.Test()
// 	ch := make(chan struct{})
// 	<-ch
// }

package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func main() {
	server := socketio.NewServer(nil)

	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("connected:", s.ID())
		fmt.Printf("s.Namespace(): %v\n", s.Namespace())
		fmt.Printf("s: %v\n", s.URL().User)
		// s.Emit("message", "HELLO WORLD")
		fmt.Println("CONNECT GOOD")
		return nil
	})

	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
		log.Println("message:", msg)
		s.Emit("reply", "have "+msg)
	})

	server.OnEvent("/", "bye", func(s socketio.Conn) string {
		last := s.Context().(string)
		s.Emit("bye", last)
		s.Close()
		return last
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		// server.Remove(s.ID())
		fmt.Println("meet error:", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		// Add the Remove session id. Fixed the connection & mem leak
		// server.Remove(s.ID())
		fmt.Println("closed", reason)
	})

	go server.Serve()
	defer server.Close()

	http.Handle("/socket.io/", corsMiddleware(server))
	http.Handle("/", corsMiddleware(http.FileServer(http.Dir("./asset"))))
	log.Println("Serving at localhost:3002...")
	log.Fatal(http.ListenAndServe(":3002", nil))
}

// package main

// import (
// 	"log"
// 	"net/http"

// 	"github.com/gin-gonic/gin"

// 	socketio "github.com/googollee/go-socket.io"
// )

// func GinMiddleware(allowOrigin string) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

// 		if c.Request.Method == http.MethodOptions {
// 			c.AbortWithStatus(http.StatusNoContent)
// 			return
// 		}

// 		// fmt.Printf("BEFORE c.Request.Header: %v\n", c.Request.Header)
// 		c.Request.Header.Del("Origin")
// 		// fmt.Printf("AFTER c.Request.Header: %v\n", c.Request.Header)

// 		c.Next()
// 	}
// }

// func main() {
// 	router := gin.New()

// 	server := socketio.NewServer(nil)

// 	server.OnConnect("/", func(s socketio.Conn) error {
// 		s.SetContext("")
// 		log.Println("connected:", s.ID())
// 		return nil
// 	})

// 	server.OnEvent("/", "message", func(s socketio.Conn, msg string) {
// 		log.Println("message:", msg)
// 		s.Emit("reply", "have "+msg)
// 	})

// 	server.OnEvent("/", "bye", func(s socketio.Conn) string {
// 		last := s.Context().(string)
// 		s.Emit("bye", last)
// 		s.Close()
// 		return last
// 	})

// 	server.OnError("/", func(s socketio.Conn, e error) {
// 		log.Println("meet error:", e)
// 	})

// 	server.OnDisconnect("/", func(s socketio.Conn, msg string) {
// 		log.Println("closed", msg)
// 	})

// 	go server.Serve()
// 	defer server.Close()

// 	router.Use(GinMiddleware("http://localhost:5501"))
// 	router.GET("/socket.io/*any", gin.WrapH(server))
// 	// router.POST("/socket.io/*any", gin.WrapH(server))
// 	// router.StaticFS("/public", http.Dir("./asset"))

// 	log.Fatal("failed run app: ", router.Run(":8080"))
// }

// // c.Request.Header: map[Accept:[*/*] Accept-Encoding:[gzip, deflate, br] Accept-Language:[en-GB,en;q=0.5] Connection:[keep-alive] Origin:[http://localhost:5501] Referer:[http://localhost:5501/] Sec-Fetch-Dest:[empty] Sec-Fetch-Mode:[cors] Sec-Fetch-Site:[same-site] User-Agent:[Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0]]
// // c.Request.Header: map[Accept:[*/*] Accept-Encoding:[gzip, deflate, br] Accept-Language:[en-GB,en;q=0.5] Connection:[keep-alive] 							   Referer:[http://localhost:5501/] Sec-Fetch-Dest:[empty] Sec-Fetch-Mode:[cors] Sec-Fetch-Site:[same-site] User-Agent:[Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0]] 2023/08/28 12:28:39

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		delete(r.Header, "Origin")

		next.ServeHTTP(w, r)
	})
}
