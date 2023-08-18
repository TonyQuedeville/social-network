package api

import (
	"encoding/json"
	"io"
	"net/http"

	event "github.com/TonyQuedeville/social-network/database-manager/structs/event_"
	group "github.com/TonyQuedeville/social-network/database-manager/structs/group_"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

type ck string

const USER_ID = ck("user_id")

func UserRegister(w http.ResponseWriter, r *http.Request) {
	// only post
	if !IsPost(w, r) {
		return
	}
	// fmt.Println("Register request")
	reqBody, _ := io.ReadAll(r.Body)                    // récupere le corp json
	u := &user.User{}                                   // prepare un user
	if err := json.Unmarshal(reqBody, &u); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}

	if u.Password == "" {
		BadRequest(w, "no password found")
		return
	}

	if err := u.Register(); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}

	u, _ = user.GetUserByMail(u.Email)

	Ok(w, u)
}

func UserLogin(w http.ResponseWriter, r *http.Request) {
	// only post
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body) // récupere le corp json
	pass := struct {
		Password *string `json:"password"`
		Email    *string `json:"email"`
	}{} // prepare un user
	if err := json.Unmarshal(reqBody, &pass); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	} else if pass.Email == nil || pass.Password == nil {
		BadRequest(w, "no 'password' or/and 'email' fields found")
		return
	}

	// Create uuid in session database
	u, uuid, err := user.Login(*pass.Password, *pass.Email)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	askFollowers := user.GetTempFolower(u.Id)
	//waitGroups := user.GetWaitUsersInGroupsByUserId(u.Id)
	invitGroups := group.GetInvitGroupsByUserId(u.Id)
	events := event.CheckNewEvent(u.Id)

	rep := struct {
		Uuid         string         `json:"uuid"`
		User         user.User      `json:"user"`
		AskFollowers []*user.User   `json:"wait_followers"`
		//WaitGroups   []interface{}  `json:"wait_groups"`
		InvitGroups  []*group.Group `json:"invit_groups"`
		Events       []*event.Event `json:"events"`
	}{
		Uuid:         uuid,
		User:         *u,
		AskFollowers: askFollowers,
		//WaitGroups:   waitGroups,
		InvitGroups:  invitGroups,
		Events:       events,
	}
	Ok(w, rep)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	// only get methode
	if !IsGet(w, r) {
		return
	}
	get_user_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	user_id := GetIdUser(r)

	Ok(w, user.GetUserById(get_user_id, user_id))
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// only get methode
	if !IsGet(w, r) {
		return
	}
	u_id := r.Context().Value(USER_ID).(uint64)
	Ok(w, user.GetUsers(u_id))
}

func GetFollowerUserById(w http.ResponseWriter, r *http.Request) {
	// only get methode
	if !IsGet(w, r) {
		return
	}
	user_id := GetIdUser(r)
	if user_id == 0 {
		BadRequest(w, "You must be connected")
		return
	}

	Ok(w, user.GetFollower(user_id))
}

func GetFollowedUserById(w http.ResponseWriter, r *http.Request) {
	// only get methode
	if !IsGet(w, r) {
		return
	}
	user_id := GetIdUser(r)
	if user_id == 0 {
		BadRequest(w, "You must be connected")
		return
	}

	Ok(w, user.GetFollowed(user_id))
}

func ManageFollower(w http.ResponseWriter, r *http.Request, flag string) {
	// only post
	if !IsPost(w, r) {
		// fmt.Println("PAS POST")
		return
	}
	user_id := GetIdUser(r)
	if user_id == 0 {
		BadRequest(w, "You must be loged")
		return
	}
	path_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	var status string
	switch flag {
	case "accept":
		status = user.AcceptFollower(user_id, path_id, true)
	case "refuse":
		status = user.AcceptFollower(user_id, path_id, false)
	case "add":
		status = user.AddFollower(path_id, user_id)
	case "sup":
		status = user.RemoveFollower(path_id, user_id)
	default:
		panic("switch manage follower key error")
	}
	Ok(w, status)
}

func AddFollower(w http.ResponseWriter, r *http.Request) {
	ManageFollower(w, r, "add")
}

func AcceptFollower(w http.ResponseWriter, r *http.Request) {
	ManageFollower(w, r, "accept")
}

func RefuseFollower(w http.ResponseWriter, r *http.Request) {
	ManageFollower(w, r, "refuse")
}

func SupFollower(w http.ResponseWriter, r *http.Request) {
	ManageFollower(w, r, "sup")
}
