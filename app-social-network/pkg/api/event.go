/*
	Projet Zone01 : Social network
	Alann Schnebelen
	25/07/2023
	Gestion des Event dans les groups
*/

package api

import (
	"encoding/json"
	"io"
	"net/http"
	"time"

	event "github.com/TonyQuedeville/social-network/database-manager/structs/event_"
)

func EventsByGroupId(w http.ResponseWriter, r *http.Request) {
	// only Get
	if !IsGet(w, r) {
		return
	}
	gr_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	Ok(w, event.ReadEventByGroupId(gr_id))
}

func AddeventInGroupId(w http.ResponseWriter, r *http.Request) {
	// only Post
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body)                    // récupere le corp json
	e := &event.Event{}                                 // prepare un user
	if err := json.Unmarshal(reqBody, &e); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}
	if e.Group_id == 0 || e.Titre == "" || e.Description == "" || e.Date == (time.Time{}) {
		BadRequest(w, `need json example : {
			"group_id": 10,
			"titre":"LeTitre",
			"description":"La description",
			"date":"2023-09-30T14:20:28.000+07:00"
		  }`)
		return
	}

	if err := e.CreateEvent(); err != nil {
		BadRequest(w, err.Error())
		return
	}

	Ok(w, "")
}

func Supevent(w http.ResponseWriter, r *http.Request) {
	// only Post
	if !IsPost(w, r) {
		return
	}

	event_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	event.DeleteEventById(event_id)

	Ok(w, "Deleted")
}

func goEvent(w http.ResponseWriter, r *http.Request, b bool) {
	// only Post
	if !IsPost(w, r) {
		return
	}

	event_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	u_id := GetIdUser(r)

	if u_id == 0 {
		BadRequest(w, "User not find")
		return
	}

	e := event.Event{Id: event_id}
	e.GoingEvent(u_id, b)

	if b {
		Ok(w, "Vous allez à l'evenement")
	} else {
		Ok(w, "Vous allez pas à l'evenement")
	}
}

func Goingevent(w http.ResponseWriter, r *http.Request) {
	goEvent(w, r, true)
}

func Notgoingevent(w http.ResponseWriter, r *http.Request) {
	goEvent(w, r, false)
}

func SupGoingEvent(w http.ResponseWriter, r *http.Request) {
	// only Post
	if !IsPost(w, r) {
		return
	}

	event_id, err := GetIdFromPath(r)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	u_id := GetIdUser(r)

	if u_id == 0 {
		BadRequest(w, "User not find")
		return
	}

	e := event.Event{Id: event_id}
	e.UnGoingEvent(u_id)

	Ok(w, "Vous avez annuler votre satus")
}
