package comment

import (
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

/* ------- CRUD ------- */

// Create
func (c *Comment) AddComment() error {
	_, err := database.Database.Exec(`
		INSERT INTO comment
		(
			post_id,
			user_id,
			pseudo,
			content,
			image,
			created_at,
			updated_at
		)
		VALUES
		(?, ?, ?, ?, ?, ?, ?)
	`, c.Post_id, c.User_id, c.Pseudo, c.Content, c.Image, time.Now(), time.Now())
	if err != nil {
		return err
	}

	return nil
}

// Read
func (c *Comment) GetComments() ([]*Comment, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			post_id,
			user_id,
			pseudo,
			content,
			image,
			created_at,
			updated_at
		FROM comment
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []*Comment
	for rows.Next() {
		var comment Comment
		err := rows.Scan(
			&comment.Id,
			&comment.Post_id,
			&comment.User_id,
			&comment.Pseudo,
			&comment.Content,
			&comment.Image,
			&comment.Created_at,
			&comment.Updated_at,
		)
		if err != nil {
			return nil, err
		}
		comments = append(comments, &comment)
	}

	return comments, nil
}

func GetCommentById(id uint64) (*Comment, error) {
	var comment Comment
	err := database.Database.QueryRow(`
		SELECT
			id,
			post_id,
			user_id,
			pseudo,
			content,
			image,
			created_at,
			updated_at
		FROM comment
		WHERE id = ?
	`, id).Scan(
		&comment.Id,
		&comment.Post_id,
		&comment.User_id,
		&comment.Pseudo,
		&comment.Content,
		&comment.Image,
		&comment.Created_at,
		&comment.Updated_at,
	)
	if err != nil {
		return nil, err
	}

	return &comment, nil
}

func GetCommentByPostId(postId uint64) ([]*Comment, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			post_id,
			user_id,
			pseudo,
			content,
			image,
			created_at,
			updated_at
		FROM comment
		WHERE post_id = ?
	`, postId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var comments []*Comment
	for rows.Next() {
		var comment Comment
		err := rows.Scan(
			&comment.Id,
			&comment.Post_id,
			&comment.User_id,
			&comment.Pseudo,
			&comment.Content,
			&comment.Image,
			&comment.Created_at,
			&comment.Updated_at,
		)
		if err != nil {
			return nil, err
		}
		comments = append(comments, &comment)
	}

	return comments, nil
}

func GetCommentByUserId(userId uint64) ([]*Comment, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			post_id,
			user_id,
			pseudo,
			content,
			image,
			created_at,
			updated_at
		FROM comment
		WHERE user_id = ?
	`, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []*Comment
	for rows.Next() {
		var comment Comment
		err := rows.Scan(
			&comment.Id,
			&comment.Post_id,
			&comment.User_id,
			&comment.Pseudo,
			&comment.Content,
			&comment.Image,
			&comment.Created_at,
			&comment.Updated_at,
		)
		if err != nil {
			return nil, err
		}
		comments = append(comments, &comment)
	}

	return comments, nil
}

// Update
func (c *Comment) UpdateComment() error {
	_, err := database.Database.Exec(`
		UPDATE comment
		SET
			post_id = ?,
			user_id = ?,
			pseudo = ?,
			content = ?,
			image = ?,
			updated_at = ?
		WHERE id = ?
	`, c.Post_id, c.User_id, c.Pseudo, c.Content, c.Image, time.Now(), c.Id)
	if err != nil {
		return err
	}

	return nil
}

// Delete
func (c *Comment) DeleteComment() error {
	_, err := database.Database.Exec(`
		DELETE FROM comment
		WHERE id = ?
	`, c.Id)
	if err != nil {
		return err
	}

	return nil
}
