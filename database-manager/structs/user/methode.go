package user

import (
	"errors"
	"fmt"
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

/* GETER >*/

func GetUserById(get_user_id uint64, user_id uint64) *User {
	u := User{}
	var have_acess bool
	err := database.Database.QueryRow(`
	SELECT u.*,
	CASE
		WHEN  ? = ?
			OR u.status = 'public'
			OR (f.user_id IS NOT NULL)
			THEN 1
			ELSE 0
		END AS have_acess
	FROM user u
	LEFT JOIN follower f ON f.user_id = ? AND f.follow_id = ?
	WHERE u.id = ?;
	`, user_id, get_user_id, get_user_id, user_id, get_user_id).Scan(
		&u.Id,
		&u.Email,
		&u.Password,
		&u.First_name,
		&u.Last_name,
		&u.Born_date,
		&u.Sexe,
		&u.Image,
		&u.Pseudo,
		&u.About,
		&u.Status,
		&u.Created_at,
		&u.Updated_at,
		&have_acess,
	)
	u.Password = ""
	u.Email = ""
	if !have_acess {
		u.RemoveCriticalData()
	}
	if err != nil {
		fmt.Println("err 1 getuserid by id:", err)
	}

	if err := u.AddFollowerFollowed(); err != nil {
		fmt.Println("err 2 getuserid by id:", err)
	}

	return &u
}

func GetUserByMail(email string) (*User, error) {
	u := &User{}

	err := database.Database.QueryRow(`
	SELECT * FROM user
	WHERE email = ?
	`, email).Scan(
		&u.Id,
		&u.Email,
		&u.Password,
		&u.First_name,
		&u.Last_name,
		&u.Born_date,
		&u.Sexe,
		&u.Image,
		&u.Pseudo,
		&u.About,
		&u.Status,
		&u.Created_at,
		&u.Updated_at,
	)
	u.Password = ""
	if err != nil {
		return u, err
	}

	u.AddFollowerFollowed()

	return u, err
}

func (u *User) GetHashPass() {
	err := database.Database.QueryRow(`
	SELECT password FROM user
	WHERE email = ?
	`, u.Email).Scan(&u.Password)
	if err != nil {
		fmt.Println("err gethashpass:", err)
	}
}

func GetUserIdByUuid(uuid string) uint64 {
	u_id := uint64(0)
	err := database.Database.QueryRow(`
	SELECT user_id FROM session
	WHERE uuid = ?
	`, uuid).Scan(&u_id)
	if err != nil {
		fmt.Println("err getuserid by uuid:", err)
	}
	return u_id
}

func GetUsers(user_id uint64) []*User {
	c := `
	CASE
		WHEN u.id = %v
			OR u.status = 'public'
			OR (f.user_id IS NOT NULL)
			THEN u.%v
		END AS %v`
	rows, err := database.Database.Query(fmt.Sprintf(
		`SELECT
		u.id,
		u.pseudo,
		u.image,
		u.status,
		%v,
		%v,
		%v,
		%v,
		%v
	FROM user u
	LEFT JOIN follower f ON f.user_id = u.id AND f.follow_id = %v;
	`, fmt.Sprintf(c, user_id, "about", "about"), fmt.Sprintf(c, user_id, "sexe", "sexe"), fmt.Sprintf(c, user_id, "first_name", "first_name"), fmt.Sprintf(c, user_id, "last_name", "last_name"), fmt.Sprintf(c, user_id, "date_of_birth", "date_of_birth"), user_id))
	if err != nil {
		fmt.Println("ERREUR QUERY ALL USERS: ", err)
	}
	result := []*User{}
	for rows.Next() {
		u := &User{}
		rows.Scan(&u.Id, &u.Pseudo, &u.Image, &u.Status, &u.About, &u.Sexe, &u.First_name, &u.Last_name, &u.Born_date)
		fmt.Printf("u: %v\n", u)
		result = append(result, u)
	}
	return result
}

func GetFollower(user_id uint64) (result []*User) {
	rows, err := database.Database.Query(`SELECT u.id, u.pseudo, u.image FROM user u
	LEFT JOIN follower f ON f.user_id = ?
	WHERE u.id = f.follow_id AND f.user_id IS NOT NULL;`, user_id)
	if err != nil {
		fmt.Println("err GetFollower:", err)
	}
	for rows.Next() {
		u := User{}
		rows.Scan(&u.Id, &u.Pseudo, &u.Image)
		result = append(result, &u)
	}
	return
}

func GetFollowed(user_id uint64) (result []*User) {
	rows, err := database.Database.Query(`SELECT u.id, u.pseudo, u.image FROM user u
	LEFT JOIN follower f ON f.follow_id = ?
	WHERE u.id = f.user_id AND f.user_id IS NOT NULL;`, user_id)
	if err != nil {
		fmt.Println("err GetFollowed:", err)
	}
	for rows.Next() {
		u := User{}
		rows.Scan(&u.Id, &u.Pseudo, &u.Image)
		result = append(result, &u)
	}
	return
}

/*< GETER */

func (u *User) RemoveCriticalData() {
	u.Email = ""
	u.Password = ""
	u.First_name = ""
	u.Last_name = ""
	u.Born_date = time.Time{}
	u.Sexe = ""
	u.About = ""
	u.Created_at = time.Time{}
	u.Updated_at = time.Time{}
}

// register user in database with given password
func (u *User) Register() error {
	// check mail validity
	if err := CheckMailValidity(u.Email); err != nil {
		return err
	}

	// check pass validity
	if err := CheckPassWordStrength(u.Password); err != nil {
		return err
	}

	// check age
	if err := CheckBirthDate(u.Born_date); err != nil {
		return err
	}

	hash_pass, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)

	_, err := database.Database.Exec(`
		INSERT INTO user
		(
			email,
			password,
			first_name,
			last_name,
			date_of_birth,
			sexe,
			image,
			pseudo,
			about,
			status
		)
		VALUES
		(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`, u.Email, string(hash_pass), u.First_name, u.Last_name, u.Born_date, u.Sexe, u.Image, u.Pseudo, u.About, u.Status)
	if err != nil {
		return err
	}

	return nil
}

// login user and create session uuid in database
func Login(password, email string) (*User, string, error) {
	u, _ := GetUserByMail(email)
	u.GetHashPass()
	if len(u.Password) == 0 {
		return u, "", errors.New("invalid mail")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return u, "", errors.New("invalid mail or password")
	}

	// generate uuid for session
	uuid, err := uuid.NewV4()
	if err != nil {
		return u, "", err
	}

	_, err = database.Database.Exec(`
		INSERT INTO session (user_id, uuid) VALUES (?, ?)
	`, u.Id, uuid.String())
	// renvoie uuid

	if err != nil {
		return u, "", err
	}
	u.Password = ""
	return u, uuid.String(), nil
}

func (u *User) AddFollowerFollowed() error {
	rows, err := database.Database.Query(`
	SELECT u.id, u.pseudo, u.image FROM user u
	LEFT JOIN follower f ON f.user_id = ?
	WHERE u.id = f.follow_id AND f.user_id IS NOT NULL;
	`, u.Id)
	if err != nil {
		return err
	}
	for rows.Next() {
		f_u := User{}
		rows.Scan(&f_u.Id, &f_u.Pseudo, &f_u.Image)
		u.Follower = append(u.Follower, &f_u)
	}

	rows, err = database.Database.Query(`
	SELECT u.id, u.pseudo, u.image FROM user u
	LEFT JOIN follower f ON f.follow_id = ?
	WHERE u.id = f.user_id AND f.user_id IS NOT NULL;
	`, u.Id)
	if err != nil {
		return err
	}
	for rows.Next() {
		f_u := User{}
		rows.Scan(&f_u.Id, &f_u.Pseudo, &f_u.Image)
		u.Followed = append(u.Followed, &f_u)
	}
	return nil
}

func IsUserPrivate(id uint64) bool {
	r := database.Database.QueryRow(`
	SELECT user.status FROM user WHERE user.id = ?
	`, id)
	s := ""
	r.Scan(&s)
	return s == "private"
}

// addFollower
func AddFollower(user_id, follow_id uint64) (status string) {
	if user_id == follow_id || user_id == 0 || follow_id == 0 {
		return "operation inpossible"
	}
	table := "follower"
	if IsUserPrivate(user_id) {
		table = "temp_follower"
	}

	_, err := database.Database.Exec(
		"INSERT INTO "+table+" (user_id, follow_id) VALUES (?, ?)", user_id, follow_id,
	)
	if err != nil {
		return err.Error()
	}
	if table == "follower" {
		return "Demande acceptée!"
	} else {
		return "Demande en attente d'acceptation"
	}
}

// accept follower
func AcceptFollower(user_id, follow_id uint64, accept bool) (status string) {
	if user_id == follow_id || user_id == 0 || follow_id == 0 {
		return "operation inpossible"
	}
	check := uint64(0)
	database.Database.QueryRow(`
	SELECT user_id FROM temp_follower WHERE follow_id = ?
	`, follow_id).Scan(&check)
	if check != user_id {
		return "operation impossible"
	}

	_, err := database.Database.Exec(`
		INSERT INTO follower (user_id, follow_id) VALUES (?, ?)
	`, user_id, follow_id)
	if err != nil {
		return "demande expirée"
	} else {
		return "demande confirmée"
	}
}

// removeFollower
func RemoveFollower(user_id, follow_id uint64) (status string) {
	if user_id == follow_id || user_id == 0 || follow_id == 0 {
		return "operation inpossible"
	}
	_, err := database.Database.Exec(`
		DELETE FROM follower WHERE user_id = ? AND follow_id = ?;
	`, user_id, follow_id)
	if err != nil {
		fmt.Printf("err Remove follower: %v\n", err)
	}
	return "remove suced"
}

// GetFollowerByUserId récupère les IDs des followers d'un utilisateur spécifié par son ID
func GetFollowerByUserId(userId uint64) ([]uint64, error) {
	// Prépare une requête SQL pour récupérer les IDs des followers de l'utilisateur
	query := `
		SELECT follow_id
		FROM follower
		WHERE user_id = ?
	`

	// Exécute la requête SQL pour récupérer les IDs des followers
	rows, err := database.Database.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Parcours les résultats et stocke les IDs des followers dans une liste
	followerIDs := []uint64{}
	for rows.Next() {
		var followerID uint64
		err := rows.Scan(&followerID)
		if err != nil {
			return nil, err
		}
		followerIDs = append(followerIDs, followerID)
	}

	return followerIDs, nil
}
