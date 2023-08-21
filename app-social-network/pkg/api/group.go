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
	"golang.org/x/exp/slices"
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
	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté

	group_id, err := GetIdFromPath(r) // Recupere l'id du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	if intel_id == 0 {
		BadRequest(w, "User not connected")
		return
	}

	group.AddGroupMember(intel_id, group_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	Ok(w, "Votre de demande à rejoindre le groupe est en attente.")
}

/* Acceptation au groupe d'un utilisateur par n'importe quel membres du groupe */
func AcceptGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}
	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté, demandeur du post (qui demande à voir le post)

	reqBody, _ := io.ReadAll(r.Body) // récupere le corp json
	g := &struct {
		Group_id uint64 `json:"group_id"`
		User_id  uint64 `json:"user_id"`
	}{} // prepare un user
	if err := json.Unmarshal(reqBody, &g); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}
	group_id := g.Group_id
	user_id := g.User_id

	group, err := group.GetGroupById(group_id) // Recupere l'objet du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	if intel_id == 0 {
		BadRequest(w, "User not connected")
		return
	}

	if group.GetMemberStatus(user_id) == "invit" {
		if user_id != intel_id {
			BadRequest(w, "Tu n'a pas le droit d'utiliser cette invitation")
			return
		}
	} else {
		group.GetGroupMembers()
		if !slices.Contains(group.Members, intel_id) {
			BadRequest(w, "Tu dois faire partie du groupe pour accepter un membre")
			return
		}
	}

	err = group.AcceptGroupMember(user_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	Ok(w, "Vous avez bien ajouter l'utilisateur au groupe")
}

/* Refut d'acceptation au groupe d'un utilisateur par n'importe quel membres du groupe */
func RefuseGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}
	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté, demandeur du post (qui demande à voir le post)

	reqBody, _ := io.ReadAll(r.Body) // récupere le corp json
	g := &struct {
		Group_id uint64 `json:"group_id"`
		User_id  uint64 `json:"user_id"`
	}{} // prepare un user                                 // prepare un user
	if err := json.Unmarshal(reqBody, &g); err != nil { // unwrap le corp dans user
		BadRequest(w, err.Error())
		return
	}
	group_id := g.Id

	user_id, err := GetIdFromPath(r) // Recupere l'id du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	group, err := group.GetGroupById(group_id) // Recupere l'objet du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	if intel_id == 0 {
		BadRequest(w, "User not connected")
		return
	}
	if group.GetMemberStatus(user_id) == "invit" {
		if user_id != intel_id {
			BadRequest(w, "Tu n'a pas le droit d'utiliser cette invitation")
			return
		}
	} else {
		group.GetGroupMembers()
		if !slices.Contains(group.Members, intel_id) {
			BadRequest(w, "Tu dois faire partie du groupe pour accepter un membre")
			return
		}
	}
	err = group.RefuseGroupMember(user_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	Ok(w, "L'utilisateur n'a pas etait ajouter au groupe.")
}

/* Quitter le groupe */
func QuitGroup(w http.ResponseWriter, r *http.Request) {
	// only post request
	if !IsPost(w, r) {
		return
	}
	intel_id := GetIdUser(r) // (cookie) Utilisateur connecté, demandeur du post (qui demande à voir le post)

	group_id, err := GetIdFromPath(r) // Recupere l'id du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}

	group, err := group.GetGroupById(group_id) // Recupere l'objet du group
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	if intel_id == 0 {
		BadRequest(w, "User not connected")
		return
	}

	err = group.DeleteGroupMember(intel_id)
	if err != nil {
		BadRequest(w, err.Error())
		return
	}
	Ok(w, "Vous avez bien quitter le groupe")
}
