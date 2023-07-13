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
	u := user.User{}                                    // prepare un user
	if err := json.Unmarshal(reqBody, &u); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}

	pass := struct {
		Password *string `json:"password"`
	}{}
	if err := json.Unmarshal(reqBody, &pass); err != nil { // unwrap le corp dans pass
		BadRequest(w, err.Error())
		return
	} else if pass.Password == nil {
		BadRequest(w, "no password field found")
		return
	}

	if err := u.Register(*pass.Password); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}

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
		BadRequest(w, "no password or/and email fields found")
		return
	}
}
