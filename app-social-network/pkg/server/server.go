package server

import (
	"net/http"

	"github.com/TonyQuedeville/social-network/app-social-network/pkg/api"
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func InitServer() {
	database.OpenDatabase()
	defer database.CloseDatabase()

	mux := http.NewServeMux()

	mux.Handle("/user/register", ApplyMiddleware(http.HandlerFunc(api.UserRegister)))
	mux.Handle("/user/login", ApplyMiddleware(http.HandlerFunc(api.UserLogin)))
	mux.Handle("/users", ApplyMiddleware(http.HandlerFunc(api.GetUsers)))
	mux.Handle("/user/", ApplyMiddleware(http.HandlerFunc(api.GetUserById)))
	http.ListenAndServe(ADRESS, mux)
}
