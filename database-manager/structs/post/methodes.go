package post

import (
	"fmt"
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

/* ------------------- CRUD Post -----------------------*/

// Create post
func (p *Post) AddPost() error {
	fmt.Println("p.Group_id:", p.Group_id)
	result, err := database.Database.Exec(`
		INSERT INTO post
		(
			group_id,
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
		(?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, p.Group_id, p.User_id, p.Pseudo, p.Status, p.Title, p.Content, p.Image, time.Now(), time.Now())
	if err != nil {
		return err
	}

	// Récupérez l'ID du dernier enregistrement inséré (ID du nouveau post)
	postID, err := result.LastInsertId()
	if err != nil {
		return err
	}
	p.Id = uint64(postID)

	if p.Status == "private-list" {
		err := AddPostPrivateList(p.Id, p.Private_list)
		if err != nil {
			return err
		}
	}

	return nil
}

// Read all posts
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

// Read post by id
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

// Read posts by user id
func GetPostsByUserId(userId, intelId uint64) ([]*Post, error) {
	// userId : Utilisateur initiateur du post (qui a créé le post)
	// intelId : (cookie) Utilisateur connecté, demandeur du post (qui demande à voir le post)

	// WHERE user_id = ? AND group_id = NULL (pour ne pas récupérer les posts publiés par le user dans un groupe. à voir ?)
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
		WHERE user_id = ? AND group_id = 0
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

// Read posts by group id
func GetPostsByGroupId(groupId uint64) ([]*Post, error) {
	rows, err := database.Database.Query(`
		SELECT
			id,
			group_id,
			user_id,
			pseudo,
			status,
			title,
			content,
			image,
			created_at,
			updated_at
		FROM post
		WHERE group_id = ?
	`, groupId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var posts []*Post
	for rows.Next() {
		var post Post
		err := rows.Scan(
			&post.Id,
			&post.Group_id,
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

// Update post
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

// Delete post
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

/* ------------------- CRUD Private list -----------------------*/

// Create
func AddPostPrivateList(postID uint64, usersId []uint64) error {
	for _, id := range usersId {
		_, err := database.Database.Exec(`
			INSERT INTO post_private_list (post_id, user_id)
			VALUES (?, ?)
		`, postID, id)
		if err != nil {
			return err
		}
	}

	return nil
}

// Read PrivateList by postId
func GetPostPrivateListByPostId(postId uint64) ([]*PostPrivateList, error) {
	rows, _ := database.Database.Query(`
		SELECT id, post_id, user_id FROM post_private_list WHERE post_id = ?
	`, postId)

	defer rows.Close()

	var postUserList []*PostPrivateList
	for rows.Next() {
		var pl PostPrivateList
		err := rows.Scan(
			&pl.Id,
			&pl.Post_id,
			&pl.User_id,
		)
		if err != nil {
			return nil, err
		}
		postUserList = append(postUserList, &pl)
	}

	return postUserList, nil
}

// Update
func (pl *PostPrivateList) UpdatePostPrivateList() error {
	_, err := database.Database.Exec(`
		UPDATE post_private_list SET post_id=?, user_id=?, updated_at=? WHERE id=?
	`, pl.Post_id, pl.User_id, time.Now(), pl.Id)
	if err != nil {
		return err
	}

	return nil
}

// Delete
func (pl *PostPrivateList) DeletePostPrivateList() error {
	_, err := database.Database.Exec(`
		DELETE FROM post_private_list WHERE id=?
	`, pl.Id)
	if err != nil {
		return err
	}

	return nil
}
