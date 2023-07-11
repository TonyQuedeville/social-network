package user

import (
	"github.com/TonyQuedeville/social-network/database-manager/database"
)

// register user in database with given password
func (u *User) RegisterUser(pass string) error {
	// check mail validity
	if err := CheckMailValidity(u.Email); err != nil {
		return err
	}

	// check pass validity
	if err := CheckPassWordStrength(pass); err != nil {
		return err
	}

	// check age
	if err := CheckBirthDate(u.Date_of_birth); err != nil {
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
	`, u.Email, pass, u.First_name, u.Last_name, u.Date_of_birth, u.Sexe, u.Image, u.Pseudo, u.About, u.Status)
	if err != nil {
		return err
	}

	return nil
}
