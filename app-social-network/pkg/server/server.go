package server

import (
	"net/http"

	"github.com/TonyQuedeville/social-network/app-social-network/pkg/api"
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func InitServer() {
	database.OpenDatabase()
	defer database.CloseDatabase()

	http.HandleFunc("/user/register", api.UserRegister)
	http.HandleFunc("/user/login", api.UserLogin)
	http.ListenAndServe(ADRESS, nil)
}
