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
		fmt.Println("err getuserid by id:", err)
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

func GetFollower(get_user_id uint64, user_id uint64) {
	database.Database.Query(`SELECT u.* FROM user u
	LEFT JOIN follower f ON f.user_id = 2
	WHERE f.user_id IS NOT NULL;`)
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
	fmt.Printf("u.Password: %v\n", u.Password)
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
