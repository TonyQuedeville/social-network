/*
	Projet Zone01 : Social network
	Tony Quedeville
	24/07/2023
	Gestion des commentaires sur publications
*/

package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/TonyQuedeville/social-network/database-manager/structs/comment"
)

/* Création d'un nouveau commentaire. (Route http://localhost:3000/newcomment) */
func NewComment(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body)       // récupere le corp json
	c := &comment.Comment{}                // prepare une publication
	if err := json.Unmarshal(reqBody, &c); // unwrap le corp dans post
	err != nil {
		fmt.Println("error json.Unmarshal:", err)
		BadRequest(w, err.Error())
		return
	}

	fmt.Println("c:", c)

	if err := c.AddComment(); // Execute la méthode du CRUD (requete sql Create)
	err != nil {
		fmt.Println("error AddComment:", err)
		BadRequest(w, err.Error())
		return
	}

	c, _ = comment.GetCommentById(c.Id)

	Ok(w, c)
}

/* Demande de visualisation des commentaires par l'id du post. (Route http://localhost:3000/comments/:postid) */
func CommentByPostId(w http.ResponseWriter, r *http.Request) {
	// only get request
	if !IsGet(w, r) {
		return
	}

	post_id, err := GetIdFromPath(r) // id du post
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	fmt.Println("post_id:", post_id)

	tabPost, err := comment.GetCommentByPostId(post_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	//fmt.Println("tabPost:", tabPost)

	Ok(w, tabPost)
}
