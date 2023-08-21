package group

import (
	"fmt"
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

/* ---------------- CRUD Group --------------------*/

// Create
func (g *Group) AddGroup() (uint64, error) {
	database.Database.QueryRow(`SELECT pseudo FROM user WHERE id = ?`, g.User_id).Scan(&g.Admin)
	result, err := database.Database.Exec(`
		INSERT INTO 'group'
		(
			user_id,
			admin,
			title,
			description,
			image,
			nb_members
		)
		VALUES
		(?, ?, ?, ?, ?, ?)
	`, g.User_id, g.Admin, g.Title, g.Description, g.Image, g.Nb_members)
	if err != nil {
		return 0, err
	}

	groupID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	g.Id = uint64(groupID)

	err = AddGroupMember(g.User_id, g.Id)

	if err != nil {
		return 0, err
	}

	err = g.AcceptGroupMember(g.User_id)
	if err != nil {
		return 0, err
	}

	return uint64(groupID), nil
}

// Read

func (g *Group) GetMemberStatus(user_id uint64) (status string) {
	database.Database.QueryRow(`
		SELECT status FROM groupmembers WHERE group_id = ? AND user_id = ?
	`, g.Id, user_id).Scan(&status)
	return
}

func (g *Group) GetGroups() ([]*Group, error) {
	rows, err := database.Database.Query(`
		SELECT
			g.id,
			g.user_id,
			g.admin,
			g.title,
			g.description,
			g.image,
			g.nb_members,
			g.created_at,
			g.updated_at
		FROM 'group' AS g
	`)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	var groups []*Group
	for rows.Next() {
		var group Group
		err := rows.Scan(
			&group.Id,
			&group.User_id,
			&group.Admin,
			&group.Title,
			&group.Description,
			&group.Image,
			&group.Nb_members,
			&group.Created_at,
			&group.Updated_at,
		)
		if err != nil {
			fmt.Println("error :", err)
			return nil, err
		}

		group.GetGroupMembers()
		group.GetGroupMembersWait()
		groups = append(groups, &group)
	}

	return groups, nil
}

func GetGroupById(id uint64) (*Group, error) {
	var group Group
	err := database.Database.QueryRow(`
		SELECT
			id,
			user_id, 
			admin,
			title,
			description,
			image,
			nb_members,
			created_at,
			updated_at
		FROM 'group'
		WHERE id = ?
	`, id).Scan(
		&group.Id,
		&group.User_id,
		&group.Admin,
		&group.Title,
		&group.Description,
		&group.Image,
		&group.Nb_members,
		&group.Created_at,
		&group.Updated_at,
	)
	if err != nil {
		return nil, err
	}

	return &group, nil
}

/* Retourne les groupes dont l'utilisateur fait parti */
func GetGroupsByUserId(user_id uint64) []*Group {
	rows, _ := database.Database.Query(`
	SELECT 'group'.* FROM 'group'
	JOIN groupmembers AS gm ON gm.user_id = ? AND gm.status IS NULL
	WHERE 'group'.id = gm.group_id
	`, user_id)
	defer rows.Close()

	var groups []*Group
	for rows.Next() {
		var group Group
		rows.Scan(
			&group.Id,
			&group.User_id,
			&group.Admin,
			&group.Title,
			&group.Description,
			&group.Image,
			&group.Nb_members,
			&group.Created_at,
			&group.Updated_at,
		)
		groups = append(groups, &group)
	}

	return groups
}

func getWaitGroupsBy(user_id uint64, status string) []*Group {
	rows, _ := database.Database.Query(fmt.Sprintf(`
	SELECT 'group'.* FROM 'group'
	JOIN groupmembers AS gm ON gm.user_id = ? AND gm.status = '%s'
	WHERE 'group'.id = gm.group_id
	`, status), user_id)
	defer rows.Close()

	var groups []*Group
	for rows.Next() {
		var group Group
		rows.Scan(
			&group.Id,
			&group.User_id,
			&group.Admin,
			&group.Title,
			&group.Description,
			&group.Image,
			&group.Nb_members,
			&group.Created_at,
			&group.Updated_at,
		)
		groups = append(groups, &group)
	}

	return groups
}

/* Retourne les groupes dont l'utilisateur est en attente d'acceptation */
func GetWaitGroupsByUserId(user_id uint64) []*Group {
	return getWaitGroupsBy(user_id, "wait")
}

/* Retourne les groupes dont l'utilisateur est invité */
func GetInvitGroupsByUserId(user_id uint64) []*Group {
	return getWaitGroupsBy(user_id, "invit")
}

// Update
func (g *Group) UpdateGroup() error {
	_, err := database.Database.Exec(`
		UPDATE 'group'
		SET
			user_id = ?,
			admin = ?,
			title = ?,
			description = ?,
			image = ?,
			nb_members = ?,
			updated_at = ?
		WHERE id = ?
	`, g.User_id, g.Admin, g.Title, g.Description, g.Image, g.Nb_members, time.Now(), g.Id)
	if err != nil {
		return err
	}

	return nil
}

/* Accept un membre au groupe de discution */
func (g *Group) AcceptGroupMember(user_id uint64) error {
	_, err := database.Database.Exec(`
		UPDATE groupmembers
		SET status = ?
		WHERE user_id = ? AND group_id = ?

	`, nil, user_id, g.Id)
	if err != nil {
		return err
	}

	return nil
}

/* Refuse un membre au groupe de discution */
func (g *Group) RefuseGroupMember(user_id uint64) error {
	err := g.DeleteGroupMember(user_id)
	if err != nil {
		return err
	}
	return nil
}

// Delete
func (g *Group) DeleteGroup() error {
	_, err := database.Database.Exec(`
		DELETE FROM 'group'
		WHERE id = ?
	`, g.Id)
	if err != nil {
		return err
	}

	return nil
}

/* ---------------- CRUD Group --------------------*/

// Create
/* Ajoute un membre au groupe de discution */
func AddGroupMember(user_id, group_id uint64) error {
	_, err := database.Database.Exec(`
		INSERT INTO groupmembers
		(
			group_id,
			user_id
		)
		VALUES
		(?, ?)
	`, group_id, user_id)
	if err != nil {
		return err
	}

	return nil
}

// Delete
/* Supprime un membre du groupe de discution */
func (g *Group) DeleteGroupMember(user_id uint64) error {
	_, err := database.Database.Exec(`
		DELETE FROM groupmembers
		WHERE group_id = ? AND user_id = ?
	`, g.Id, user_id)
	if err != nil {
		return err
	}

	return nil
}

// Read
/* Retourne les membres du groupe */
func (g *Group) GetGroupMembers() {
	rows, _ := database.Database.Query(`
	SELECT user_id
	FROM groupmembers
	WHERE group_id = ? AND status IS NULL
	`, g.Id)
	defer rows.Close()

	var groupMembers []uint64
	for rows.Next() {
		var memberID uint64
		rows.Scan(
			&memberID,
		)
		groupMembers = append(groupMembers, memberID)
	}

	g.Members = groupMembers

	// rows, _ := database.Database.Query(`
	// SELECT user.id, user.pseudo, user.first_name, user.last_name, user.sexe, user.about, user.image
	// FROM user
	// JOIN groupmembers AS gm ON gm.group_id = ? AND gm.status IS NULL
	// WHERE user.id = gm.user_id
	// `, group_id)
	// defer rows.Close()

	// var users []*User
	// for rows.Next() {
	// 	var u User
	// 	rows.Scan(
	// 		&u.Id,
	// 		&u.Pseudo,
	// 		&u.First_name,
	// 		&u.Last_name,
	// 		&u.Sexe,
	// 		&u.About,
	// 		&u.Image,
	// 	)
	// 	users = append(users, &u)
	// }

	// return users
}

/* Retourne les membres du groupe en attente d'acceptation */
func (g *Group) GetGroupMembersWait() {
	rows, _ := database.Database.Query(`
	SELECT user_id
	FROM groupmembers
	WHERE group_id = ? AND status IS NOT NULL
	`, g.Id)
	defer rows.Close()

	var groupWaitMembers []uint64
	for rows.Next() {
		var memberID uint64
		rows.Scan(
			&memberID,
		)
		groupWaitMembers = append(groupWaitMembers, memberID)
	}

	g.WaitMembers = groupWaitMembers

	// rows, _ := database.Database.Query(`
	// SELECT user.id, user.pseudo, user.first_name, user.last_name, user.sexe, user.about, user.image
	// FROM user
	// JOIN groupmembers AS gm ON gm.group_id = ? AND gm.status IS NULL
	// WHERE user.id = gm.user_id
	// `, group_id)
	// defer rows.Close()

	// var users []*User
	// for rows.Next() {
	// 	var u User
	// 	rows.Scan(
	// 		&u.Id,
	// 		&u.Pseudo,
	// 		&u.First_name,
	// 		&u.Last_name,
	// 		&u.Sexe,
	// 		&u.About,
	// 		&u.Image,
	// 	)
	// 	users = append(users, &u)
	// }

	// return users
}
