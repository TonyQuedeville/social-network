package user

import (
	"testing"
	"time"
)

func TestRegisterUserBadBirthDate(t *testing.T) {
	u_bad_bd := User{
		Id:            0,          // uint64    `json:"id"`
		Email:         "a@a",      // string    `json:"email"`
		First_name:    "",         // string    `json:"first_name"`
		Last_name:     "",         // string    `json:"last_name"`
		Date_of_birth: time.Now(), // time.Time `json:"date_of_birth"`
		Sexe:          "",         // string    `json:"Sexe"`
		Status:        "",         // string    `json:"status"`
		Pseudo:        "",         // string    `json:"pseudo"`
		Image:         "",         // string    `json:"image"`
		About:         "",         // string    `json:"about"`
		Follower:      []uint64{}, //[]uint64  `json:"follower"`
		Followed:      []uint64{}, //[]uint64  `json:"followed"`
		Created_at:    time.Now(), // time.Time `json:"created_at"`
		Updated_at:    time.Now(), // time.Time `json:"updated_at"`
	}
	want := "you must be at least 15 year old"

	if err := u_bad_bd.RegisterUser("1test"); err.Error() != want {
		t.Fatalf(`u_bad_bd.RegisterUser("1test"), output: "%v"; want: "%v"`, err, want)
	}
}

func TestRegisterUserBadMail(t *testing.T) {
	u_bad_mail := User{
		Id:            0,                             // uint64    `json:"id"`
		Email:         "bad mail",                    // string    `json:"email"`
		First_name:    "",                            // string    `json:"first_name"`
		Last_name:     "",                            // string    `json:"last_name"`
		Date_of_birth: time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:          "",                            // string    `json:"Sexe"`
		Status:        "",                            // string    `json:"status"`
		Pseudo:        "",                            // string    `json:"pseudo"`
		Image:         "",                            // string    `json:"image"`
		About:         "",                            // string    `json:"about"`
		Follower:      []uint64{},                    //[]uint64  `json:"follower"`
		Followed:      []uint64{},                    //[]uint64  `json:"followed"`
		Created_at:    time.Now(),                    // time.Time `json:"created_at"`
		Updated_at:    time.Now(),                    // time.Time `json:"updated_at"`
	}
	// want := "mail: no angle-addr"

	if err := u_bad_mail.RegisterUser("1test"); err == nil {
		t.Fatalf(`u_bad_bd.RegisterUser("1test"), output: "%v"; want: "error"`, err)
	}
}

func TestRegisterUserBadPassword(t *testing.T) {
	u_bad_mail := User{
		Id:            0,                             // uint64    `json:"id"`
		Email:         "notbad@mail",                 // string    `json:"email"`
		First_name:    "",                            // string    `json:"first_name"`
		Last_name:     "",                            // string    `json:"last_name"`
		Date_of_birth: time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:          "",                            // string    `json:"Sexe"`
		Status:        "",                            // string    `json:"status"`
		Pseudo:        "",                            // string    `json:"pseudo"`
		Image:         "",                            // string    `json:"image"`
		About:         "",                            // string    `json:"about"`
		Follower:      []uint64{},                    //[]uint64  `json:"follower"`
		Followed:      []uint64{},                    //[]uint64  `json:"followed"`
		Created_at:    time.Now(),                    // time.Time `json:"created_at"`
		Updated_at:    time.Now(),                    // time.Time `json:"updated_at"`
	}
	// want := "mail: no angle-addr"

	if err := u_bad_mail.RegisterUser("bad"); err == nil {
		t.Fatalf(`u_bad_bd.RegisterUser("bad"), output: "%v"; want: "error"`, err)
	}
}

func TestRegisterUserGoodCredential(t *testing.T) {
	u_bad_mail := User{
		Id:            0,                             // uint64    `json:"id"`
		Email:         "notbad@mail",                 // string    `json:"email"`
		First_name:    "",                            // string    `json:"first_name"`
		Last_name:     "",                            // string    `json:"last_name"`
		Date_of_birth: time.Now().AddDate(-16, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:          "",                            // string    `json:"Sexe"`
		Status:        "",                            // string    `json:"status"`
		Pseudo:        "",                            // string    `json:"pseudo"`
		Image:         "",                            // string    `json:"image"`
		About:         "",                            // string    `json:"about"`
		Follower:      []uint64{},                    //[]uint64  `json:"follower"`
		Followed:      []uint64{},                    //[]uint64  `json:"followed"`
		Created_at:    time.Now(),                    // time.Time `json:"created_at"`
		Updated_at:    time.Now(),                    // time.Time `json:"updated_at"`
	}
	// want := "mail: no angle-addr"

	if err := u_bad_mail.RegisterUser("notbad"); err != nil {
		t.Fatalf(`u_bad_bd.RegisterUser("notbad"), output: "%v"; want: "nil"`, err)
	}
}
