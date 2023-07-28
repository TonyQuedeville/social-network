/*
	Projet Zone01 : Social network
	Tony Quedeville
	22/07/2023
	Gestion des publications (utilisateur et groupe de discution)
*/

package api

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/TonyQuedeville/social-network/database-manager/database"
	"github.com/TonyQuedeville/social-network/database-manager/structs/post"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

/* Création d'une nouvelle publication. (Route http://localhost:3000/newpost) */
func NewPost(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body)       // récupere le corp json
	p := &post.Post{}                      // prepare une publication
	if err := json.Unmarshal(reqBody, &p); // unwrap le corp dans post
	err != nil {
		BadRequest(w, err.Error())
		return
	}

	if err := p.AddPost(); // Execute la méthode du CRUD (requete sql Create)
	err != nil {
		BadRequest(w, err.Error())
		return
	}

	p, _ = post.GetPostById(p.Id)

	Ok(w, p)
}

/* Demande de visualisation des publications par l'id de l'utilisateur initiateur du post. (Route http://localhost:3000/post/:userid) */
func PostsByUserId(w http.ResponseWriter, r *http.Request) {
	// only get request
	if !IsGet(w, r) {
		return
	}

	user_id, err := GetIdFromPath(r) // Utilisateur initiateur du post (qui a créé le post)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté, demandeur du post (qui demande à voir le post)

	tabPost, err := post.GetPostsByUserId(user_id, intel_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	// Logique de filtrage des publications par le status
	filteredPosts := []*post.Post{}

	for _, p := range tabPost {
		if p.Status == "public" || user_id == intel_id {
			// Si le post est public, l'ajouter directement à la liste filtrée
			filteredPosts = append(filteredPosts, p)
		} else if p.Status == "private-list" {
			privateList, err := post.GetPostPrivateListByPostId(p.Id) // Récupérer la liste privée du post
			if err == nil {
				for _, u := range privateList {
					if u.User_id == intel_id {
						// Si l'utilisateur connecté est dans la liste privée, ajouter le post à la liste filtrée
						filteredPosts = append(filteredPosts, p)
						break // Sortir de la boucle dès qu'on a trouvé une correspondance
					}
				}
			}
		} else if p.Status == "private" {
			followers, err := user.GetFollowerByUserId(user_id) // Récupérer les followers de l'auteur du post
			if err == nil {
				for _, folowerId := range followers {
					if folowerId == intel_id {
						// Si l'utilisateur connecté est dans la liste privée, ajouter le post à la liste filtrée
						filteredPosts = append(filteredPosts, p)
						break // Sortir de la boucle dès qu'on a trouvé une correspondance
					}
				}
			}
		}
		// Pour les posts avec le statut "private", ils ne seront pas inclus dans la liste filtrée
	}

	Ok(w, filteredPosts)
}

func IsPostPrivateList(id uint64) bool {
	r := database.Database.QueryRow(`
	SELECT post.status FROM post WHERE post.id = ?
	`, id)
	s := ""
	r.Scan(&s)
	return s == "private-list"
}
