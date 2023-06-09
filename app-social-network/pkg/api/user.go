package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

func UserRegister(w http.ResponseWriter, r *http.Request) {
	// only post
	if !IsPost(w, r) {
		return
	}

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

	rep := struct {
		Uuid string    `json:"uuid"`
		User user.User `json:"user"`
	}{
		Uuid: uuid,
		User: *u,
	}

	Ok(w, rep)
}
