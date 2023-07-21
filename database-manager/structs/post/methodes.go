package post

import (
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// CRUD

// Create
func (p *Post) AddPost() error {
	_, err := database.Database.Exec(`
		INSERT INTO post
		(
			user_id,
			pseudo,
			status,
			title,
			content,
			image,
			created_at,
			updated_at
		)
		VALUES
		(?, ?, ?, ?, ?, ?, ?, ?)
	`, p.User_id, p.Pseudo, p.Status, p.Title, p.Content, p.Image, time.Now(), time.Now())
	if err != nil {
		return err
	}

	return nil
}

// Read
func (p *Post) GetPosts() ([]*Post, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			user_id,
			pseudo,
			status,
			title,
			content,
			image,
			created_at,
			updated_at
		FROM post
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		var post Post
		err := rows.Scan(
			&post.Id,
			&post.User_id,
			&post.Pseudo,
			&post.Status,
			&post.Title,
			&post.Content,
			&post.Image,
			&post.Created_at,
			&post.Updated_at,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, &post)
	}

	return posts, nil
}

func GetPostById(id uint64) (*Post, error) {
	var post Post
	err := database.Database.QueryRow(`
		SELECT
			id,
			user_id,
			pseudo,
			status,
			title,
			content,
			image,
			created_at,
			updated_at
		FROM post
		WHERE id = ?
	`, id).Scan(
		&post.Id,
		&post.User_id,
		&post.Pseudo,
		&post.Status,
		&post.Title,
		&post.Content,
		&post.Image,
		&post.Created_at,
		&post.Updated_at,
	)
	if err != nil {
		return nil, err
	}

	return &post, nil
}

func GetPostByUserId(userId uint64) ([]*Post, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			user_id,
			pseudo,
			status,
			title,
			content,
			image,
			created_at,
			updated_at
		FROM post
		WHERE user_id = ?
	`, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		var post Post
		err := rows.Scan(
			&post.Id,
			&post.User_id,
			&post.Pseudo,
			&post.Status,
			&post.Title,
			&post.Content,
			&post.Image,
			&post.Created_at,
			&post.Updated_at,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, &post)
	}

	return posts, nil
}

// Update
func (p *Post) UpdatePost() error {
	_, err := database.Database.Exec(`
		UPDATE post
		SET
			user_id = ?,
			pseudo = ?,
			status = ?,
			title = ?,
			content = ?,
			image = ?,
			updated_at = ?
		WHERE id = ?
	`, p.User_id, p.Pseudo, p.Status, p.Title, p.Content, p.Image, time.Now(), p.Id)
	if err != nil {
		return err
	}

	return nil
}

// Delete
func (p *Post) DeletePost() error {
	_, err := database.Database.Exec(`
		DELETE FROM post
		WHERE id = ?
	`, p.Id)
	if err != nil {
		return err
	}

	return nil
}
