/*
	Projet Zone01 : Social network
	Tony Quedeville
	25/07/2023
	Gestion des groupes de discution
*/

package api

import (
	"encoding/json"
	"io"
	"net/http"

	group "github.com/TonyQuedeville/social-network/database-manager/structs/group_"
	post "github.com/TonyQuedeville/social-network/database-manager/structs/post"
	"github.com/TonyQuedeville/social-network/database-manager/structs/user"
)

/* Création d'un nouveau groupe de discution. (Route http://localhost:3000/newgroup) */
func NewGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

	reqBody, _ := io.ReadAll(r.Body)       // récupere le corp json
	g := &group.Group{}                    // prepare une publication
	if err := json.Unmarshal(reqBody, &g); // unwrap le corp dans post
	err != nil {
		// fmt.Println("error Unmarshal :", err)
		BadRequest(w, err.Error())
		return
	}

	groupId, err := g.AddGroup() // Execute la méthode du CRUD (requete sql Create)
	if err != nil {
		// fmt.Println("error AddGroup :", err)
		BadRequest(w, err.Error())
		return
	}

	g, err = group.GetGroupById(groupId) // Récupere le groupe créé
	if err != nil {
		// fmt.Println("error GetGroupById :", err)
		BadRequest(w, err.Error())
		return
	}

	if err := g.AddGroupMember(g.User_id); // Ajoute le créateur du groupe en tant que membre du groupe
	err != nil {
		BadRequest(w, err.Error())
		return
	}

	Ok(w, g)
}

/* Demande de visualisation des groupes de discution (Route http://localhost:3000/groupes) */
func Groups(w http.ResponseWriter, r *http.Request) {
	// only get request
	if !IsGet(w, r) {
		return
	}

	g := &group.Group{}
	tabGroup, err := g.GetGroups()
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	Ok(w, tabGroup)
}

/* Demande de visualisation d'un groupe par son id (Route http://localhost:3000/groupe/:groupid) */
func GroupById(w http.ResponseWriter, r *http.Request) {
	// only get request
	if !IsGet(w, r) {
		return
	}

	group_id, err := GetIdFromPath(r) // id du groupe
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	g, err := group.GetGroupById(group_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	g.GetGroupMembers()
	g.GetGroupMembersWait()

	Ok(w, g)
}

/* Demande de visualisation des publications d'un groupe par son id (Route http://localhost:3000/groupposts/:groupid) */
func PostsByGrouypId(w http.ResponseWriter, r *http.Request) {
	// only get request
	if !IsGet(w, r) {
		return
	}

	group_id, err := GetIdFromPath(r) // id du groupe
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	posts, err := post.GetPostsByGroupId(group_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté (qui demande à voir le groupe)
	for _, p := range posts {
		u := user.GetUserById(p.User_id, intel_id)
		p.Private_list = append(p.Private_list, u.Id)
	}

	Ok(w, posts)
}

/* Demande d'adhésion au groupe par un utilisateur */
func JoinGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

}

/* Acceptation au groupe d'un utilisateur par n'importe quel membres du groupe */
func AcceptGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

}

/* Refut d'acceptation au groupe d'un utilisateur par n'importe quel membres du groupe */
func RefuseGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}

}

/* Quitter le groupe */
func QuitGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}
	
}