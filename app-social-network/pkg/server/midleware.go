package server

import "net/http"

// func exampleMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		// Our middleware logic goes here...
// 		next.ServeHTTP(w, r)
// 	})
// }

func ApplyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next = AlowCorse(next)
		next.ServeHTTP(w, r)
	})
}

func AlowCorse(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*") // A CHANGER POUR UN POTENTIEL DEPLOIMENT
		next.ServeHTTP(w, r)
	})
}
