package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func IsPost(w http.ResponseWriter, r *http.Request) bool {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return false
	}
	return true
}

func IsGet(w http.ResponseWriter, r *http.Request) bool {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return false
	}
	return true
}

func BadRequest(w http.ResponseWriter, message_error string) {
	w.WriteHeader(http.StatusBadRequest)
	fmt.Fprintf(w,
		`{
	"error": "%s"
}`,
		message_error)
}

type reponse struct {
	Datas interface{} `json:"datas"`
}

func Ok(w http.ResponseWriter, rep interface{}) {
	w.WriteHeader(http.StatusOK)
	corp, _ := json.MarshalIndent(reponse{Datas: rep}, "", "	")
	w.Write(corp)
}

func GetIdFromPath(r *http.Request) (user_id uint64, err error) {
	p := strings.Split(r.URL.Path, "/")
	_, err = fmt.Sscanf(r.URL.Path, strings.Join(p[:len(p)-1], "/")+"/%d", &user_id) // recupere l'id
	return
}

func GetIdUser(r *http.Request) uint64 {
	return r.Context().Value(USER_ID).(uint64)
}
