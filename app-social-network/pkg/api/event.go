/*
	Projet Zone01 : Social network
	Alann Schnebelen
	25/07/2023
	Gestion des Evènements dans les groupes de discution
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

	reqBody, _ := io.ReadAll(r.Body) // récupere le corp json
	e := &event.Event{}
	if err := json.Unmarshal(reqBody, &e); err != nil { // unwrap le corp de la requete
		BadRequest(w, err.Error())
		return
	}
	if e.Group_id == 0 || e.Titre == "" || e.Description == "" || e.Date == (time.Time{}) {
		BadRequest(w, `need json example : {
			"group_id": 10,
			"titre":"Le Titre",
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

	Ok(w, "Evènement supprimé")
}

func GoEvent(w http.ResponseWriter, r *http.Request) {
	// only Post
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body) // récupere le corp json
	eventdata := &struct {
		Event_id uint64 `json:"event_id"`
		Going    string `json:"going"`
	}{}

	if err := json.Unmarshal(reqBody, &eventdata); err != nil { // unwrap le corp de la requete
		BadRequest(w, err.Error())
		return
	}

	u_id := GetIdUser(r)

	if u_id == 0 {
		BadRequest(w, "User not find")
		return
	}

	e := event.Event{Id: eventdata.Event_id}

	switch eventdata.Going {
	case "je participe":
		e.GoingEvent(u_id, true)
		Ok(w, "Vous participez à l'évènement")

	case "je ne participe pas":
		e.GoingEvent(u_id, false)
		Ok(w, "Vous ne participez pas à l'évènement")

	case "pas intérréssé":
		e.UnGoingEvent(u_id)
		Ok(w, "l'événement ne vous intéresse pas")

	default:
		BadRequest(w, "Type d'événement inconnu")
	}
}
