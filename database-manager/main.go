package main

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// no program here ;)
func main() {
	// test
	database.OpenDatabase()
	defer database.CloseDatabase()
	// e := event.Event{
	// 	Group_id:    1,
	// 	Titre:       "TitreEvent",
	// 	Description: "ça decrit",
	// 	Date:        time.Now().AddDate(0, 1, 0),
	// }
	// fmt.Println(event.DeleteEventById(1))
}
