package user

import (
	"fmt"
	"net/mail"
	"time"
)

func CheckMailValidity(email string) error {
	_, err := mail.ParseAddress(email)
	return err
}

const (
	PASS_LENGHT = 4
	MIN_NUM     = 1
	LEGAL_AGE   = 15
)

func CheckPassWordStrength(pass string) error { // to complette
	// check password lenght
	if len(pass) <= PASS_LENGHT {
		return fmt.Errorf("password must contain at least %v characters not: %v", PASS_LENGHT, len(pass))
	}

	/*
		// check at least one num
		if !! < MIN_NUM {
			return fmt.Errorf("password must contain at least %v number not: %v", PASS_LENGHT, !!)
		}
	*/

	return nil
}

// check the validity age and legal age
func CheckBirthDate(date time.Time) error {
	// check age
	if date.AddDate(LEGAL_AGE, 0, 0).After(time.Now()) {
		return fmt.Errorf("you must be at least %v year old", LEGAL_AGE)
	}
	return nil
}
