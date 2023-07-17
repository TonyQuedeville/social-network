package user

import (
	"errors"
	"fmt"

	"github.com/TonyQuedeville/social-network/database-manager/database"
	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

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

	return u, uuid.String(), nil
}
