package group

import (
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// CRUD

// Create
func (g *Group) AddGroup() error {
	_, err := database.Database.Exec(`
		INSERT INTO groups
		(
			user_id,
			admin,
			title,
			description,
			image,
			nb_members,
			created_at,
			updated_at
		)
		VALUES
		(?, ?, ?, ?, ?, ?, ?, ?)
	`, g.User_id, g.Admin, g.Title, g.Description, g.Image, g.Nb_members, time.Now(), time.Now())
	if err != nil {
		return err
	}

	return nil
}

// Read
func (g *Group) GetGroups() ([]*Group, error) {
	rows, err := database.Database.Query(`
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
		FROM groups
	`)
	if err != nil {
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
			return nil, err
		}
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
		FROM groups
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

func GetGroupByUserId(userId uint64) ([]*Group, error) {
	rows, err := database.Database.Query(`
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
		FROM groups
		WHERE user_id = ?
	`, userId)
	if err != nil {
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
			return nil, err
		}
		groups = append(groups, &group)
	}

	return groups, nil
}

// Update
func (g *Group) UpdateGroup() error {
	_, err := database.Database.Exec(`
		UPDATE groups
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

// Delete
func (g *Group) DeleteGroup() error {
	_, err := database.Database.Exec(`
		DELETE FROM groups
		WHERE id = ?
	`, g.Id)
	if err != nil {
		return err
	}

	return nil
}
