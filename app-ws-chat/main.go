package main

import (
	"github.com/TonyQuedeville/social-network/app-ws-chat/pkg/server"
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func main() {
	database.OpenDatabase()
	defer database.CloseDatabase()
	server.StartServer()
	ch := make(chan struct{})
	<-ch
}
