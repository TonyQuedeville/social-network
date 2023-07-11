package main

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func main() {
	database.DbInit()
	quite := make(chan struct{})
	<-quite
}
