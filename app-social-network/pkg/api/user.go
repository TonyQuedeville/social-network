package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

type ck string

const USER_ID = ck("user_id")

func UserRegister(w http.ResponseWriter, r *http.Request) {
	fmt.Println("TRY REGISTER")
	// only post
	if !IsPost(w, r) {
		return
	}
	fmt.Println("Register request")
	reqBody, _ := io.ReadAll(r.Body)                    // récupere le corp json
	u := &user.User{}                                   // prepare un user
	if err := json.Unmarshal(reqBody, &u); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}
	fmt.Printf("Unmarshal user register form %v\n", u)

	if u.Password == "" {
		BadRequest(w, "no password found")
		return
	}

	if err := u.Register(); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}

	u, _ = user.GetUserByMail(u.Email)

	fmt.Printf("user form  register %v\n", u)

	Ok(w, u)
}

func UserLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("TRY LOGIN")
	// only post
	if !IsPost(w, r) {
		return
	}
	fmt.Println("Login request")

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

	rep := struct {
		Uuid string    `json:"uuid"`
		User user.User `json:"user"`
	}{
		Uuid: uuid,
		User: *u,
	}
	fmt.Println("LOGIN OK")
	Ok(w, rep)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	// only get methode
	if !IsGet(w, r) {
		return
	}
	var get_user_id uint64
	_, err := fmt.Sscanf(r.URL.Path, "/user/%d", &get_user_id) // recupere l'id
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	user_id := r.Context().Value(USER_ID).(uint64)

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

// func GetFollowerUserById(w http.ResponseWriter, r *http.Request) {
// 	// only get methode
// 	if !IsGet(w, r) {
// 		return
// 	}
// 	var follower_id uint64
// 	_, err := fmt.Sscanf(r.URL.Path, "/follower/%d", &follower_id) // recupere l'id
// 	if err != nil {
// 		BadRequest(w, err.Error())
// 		return
// 	}

// 	user_id := r.Context().Value(USER_ID).(uint64)

// 	Ok(w, user.GetUserById(get_user_id, user_id))
// }
