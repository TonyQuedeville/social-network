package user

import (
	"errors"

	"github.com/TonyQuedeville/social-network/database-manager/database"
	"golang.org/x/crypto/bcrypt"
)

// register user in database with given password
func (u *User) Register(pass string) error {
	// check mail validity
	if err := CheckMailValidity(u.Email); err != nil {
		return err
	}

	// check pass validity
	if err := CheckPassWordStrength(pass); err != nil {
		return err
	}

	// check age
	if err := CheckBirthDate(u.Born_date); err != nil {
		return err
	}

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
	`, u.Email, pass, u.First_name, u.Last_name, u.Born_date, u.Sexe, u.Image, u.Pseudo, u.About, u.Status)
	if err != nil {
		return err
	}

	return nil
}

// login user and create session uuid in database
func Login(password, email string) error {
	hash_pass := []byte{}
	database.Database.QueryRow(`
		SELECT password FROM user
		WHERE email = ?
	`, email).Scan(&hash_pass)

	if len(hash_pass) == 0 {
		return errors.New("invalid mail")
	}

	if err := bcrypt.CompareHashAndPassword(hash_pass, []byte(password)); err != nil {
		return errors.New("invalid mail or password")
	}
	return nil
}
