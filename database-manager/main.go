package main

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// no program here ;)
func main() {
	// test
	database.OpenDatabase()
	defer database.CloseDatabase()
	// fmt.Println(conv.CreateGroupConv(2, "LaPremierConv", "image.png"))
	// conv.AddMemberToGroupConv(1, 2, "", "")
	// fmt.Println(conv.CreatePrivateConv(1, 2))
	// conv.CreateMesage(1, 2, "Coucou")
	// fmt.Printf("conv.GetAllHeadConvByUserId(2): %v\n", *conv.GetAllHeadConvByUserId(1)[0])
	// fmt.Printf("conv.GetNewLastMessages(7, 2): %v\n", conv.GetNewLastMessages(7, 1))
	// fmt.Printf("user.GetWaitUsersInGroupsByUserId(1): %v\n", user.GetWaitUsersInGroupsByUserId(1))
	// e := event.Event{
	// 	Group_id:    1,
	// 	Titre:       "TitreEvent",
	// 	Description: "ça decrit",
	// 	Date:        time.Now().AddDate(0, 1, 0),
	// }
	// fmt.Println(event.DeleteEventById(1))
}
