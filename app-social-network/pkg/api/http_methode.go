package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func IsPost(w http.ResponseWriter, r *http.Request) bool {
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
	datas interface{}
}

func Ok(w http.ResponseWriter, rep interface{}) {
	w.WriteHeader(http.StatusOK)
	corp, _ := json.MarshalIndent(reponse{datas: rep}, "", "	")
	w.Write(corp)
}
