package main

import (
	"fmt"

	"github.com/TonyQuedeville/social-network/database-manager/database"
	event "github.com/TonyQuedeville/social-network/database-manager/structs/event_"
)

// no program here ;)
func main() {
	// test
	database.OpenDatabase()
	defer database.CloseDatabase()
	fmt.Printf("event.ReadEventByGroupId(1): %v\n", event.CheckNewEvent(1)[0])
	// e := event.Event{
	// 	Group_id:    1,
	// 	Titre:       "TitreEvent",
	// 	Description: "ça decrit",
	// 	Date:        time.Now().AddDate(0, 1, 0),
	// }
	// fmt.Println(event.DeleteEventById(1))
}
