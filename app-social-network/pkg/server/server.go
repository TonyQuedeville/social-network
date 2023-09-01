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

	// user
	mux.Handle("/verifcookie", ApplyMiddleware(http.HandlerFunc(api.VerifCookie)))
	mux.Handle("/user/register", ApplyMiddleware(http.HandlerFunc(api.UserRegister)))
	mux.Handle("/user/login", ApplyMiddleware(http.HandlerFunc(api.UserLogin)))
	mux.Handle("/users", ApplyMiddleware(http.HandlerFunc(api.GetUsers)))
	mux.Handle("/user/", ApplyMiddleware(http.HandlerFunc(api.GetUserById)))
	mux.Handle("/addfollower/", ApplyMiddleware(http.HandlerFunc(api.AddFollower)))
	mux.Handle("/acceptfollower/", ApplyMiddleware(http.HandlerFunc(api.AcceptFollower)))
	mux.Handle("/refusefollower/", ApplyMiddleware(http.HandlerFunc(api.RefuseFollower)))
	mux.Handle("/supfollower/", ApplyMiddleware(http.HandlerFunc(api.SupFollower)))
	// mux.Handle("/follower/", ApplyMiddleware(http.HandlerFunc(api.GetFollowerUserById)))

	// post
	mux.Handle("/newpost", ApplyMiddleware(http.HandlerFunc(api.NewPost)))
	mux.Handle("/userposts/", ApplyMiddleware(http.HandlerFunc(api.PostsByUserId)))
	mux.Handle("/newcomment", ApplyMiddleware(http.HandlerFunc(api.NewComment)))
	mux.Handle("/comments/", ApplyMiddleware(http.HandlerFunc(api.CommentByPostId)))

	// groupes
	mux.Handle("/newgroup", ApplyMiddleware(http.HandlerFunc(api.NewGroup)))
	mux.Handle("/groupes", ApplyMiddleware(http.HandlerFunc(api.Groups)))
	mux.Handle("/groupe/", ApplyMiddleware(http.HandlerFunc(api.GroupById)))
	mux.Handle("/groupposts/", ApplyMiddleware(http.HandlerFunc(api.PostsByGrouypId)))
	mux.Handle("/joingroup/", ApplyMiddleware(http.HandlerFunc(api.JoinGroup)))
	mux.Handle("/invitgroup/", ApplyMiddleware(http.HandlerFunc(api.InvitGroup)))
	mux.Handle("/acceptgroup", ApplyMiddleware(http.HandlerFunc(api.AcceptGroup))) //{"group_id": 1, "user_id": 1}
	mux.Handle("/refusegroup", ApplyMiddleware(http.HandlerFunc(api.RefuseGroup))) //{"group_id": 1, "user_id": 1}
	mux.Handle("/quitgroup/", ApplyMiddleware(http.HandlerFunc(api.QuitGroup)))

	// events
	mux.Handle("/events/", ApplyMiddleware(http.HandlerFunc(api.EventsByGroupId))) // group id
	mux.Handle("/addevent", ApplyMiddleware(http.HandlerFunc(api.AddeventInGroupId)))
	mux.Handle("/supevent/", ApplyMiddleware(http.HandlerFunc(api.Supevent))) // event id
	mux.Handle("/goingevent", ApplyMiddleware(http.HandlerFunc(api.GoEvent)))

	http.ListenAndServe(ADRESS, mux)
}
