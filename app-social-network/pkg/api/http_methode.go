package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func IsPost(w http.ResponseWriter, r *http.Request) bool {
	// if r.Method != http.MethodOptions {
	// 	w.WriteHeader(http.StatusOK)
	// 	return false
	// }
	if r.Method != http.MethodPost {
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
