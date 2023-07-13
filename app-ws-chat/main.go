package main

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func main() {
	database.OpenDatabase()
	defer database.CloseDatabase()
	ch := make(chan struct{})
	<-ch
}
