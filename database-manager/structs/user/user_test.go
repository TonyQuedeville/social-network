package user

import (
	"fmt"
	"strings"
	"testing"
	"time"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func TestRegisterUserBadBirthDate(t *testing.T) {
	u_bad_bd := User{
		Id:         0,          // uint64    `json:"id"`
		Email:      "a@a",      // string    `json:"email"`
		First_name: "",         // string    `json:"first_name"`
		Last_name:  "",         // string    `json:"last_name"`
		Born_date:  time.Now(), // time.Time `json:"date_of_birth"`
		Sexe:       "",         // string    `json:"Sexe"`
		Status:     "",         // string    `json:"status"`
		Pseudo:     "",         // string    `json:"pseudo"`
		Image:      "",         // string    `json:"image"`
		About:      "",         // string    `json:"about"`
		Follower:   []uint64{}, //[]uint64  `json:"follower"`
		Followed:   []uint64{}, //[]uint64  `json:"followed"`
		Created_at: time.Now(), // time.Time `json:"created_at"`
		Updated_at: time.Now(), // time.Time `json:"updated_at"`
	}
	want := "you must be at least 15 year old"

	if err := u_bad_bd.Register(); err != nil && err.Error() != want {
		t.Fatalf(`u_bad_bd.Register(), output: "%v"; want: "%v"`, err, want)
	}
}

func TestRegisterUserGoodBirthDate(t *testing.T) {
	u_good_bd := &User{
		Id:         0,                             // uint64    `json:"id"`
		Email:      "bd@bd",                       // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-16, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string     `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	fmt.Println(u_good_bd)
	database.OpenDatabase()
	defer database.CloseDatabase()
	no_want := "you must be at least 15 year old"
	if err := u_good_bd.Register(); err != nil && err.Error() == no_want {
		t.Fatalf(`u_good_bd.Register(), output: "%v"; want: "%v"`, err, "other")
	}
}

func TestRegisterUserBadMail(t *testing.T) {
	u_bad_mail := User{
		Id:         0,                             // uint64    `json:"id"`
		Email:      "bad mail",                    // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string    `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	want := "mail"

	if err := u_bad_mail.Register(); err != nil && !strings.Contains(err.Error(), want) {
		t.Fatalf(`u_bad_mail.Register(), output: "%v"; want: "error"`, err)
	}
}

func TestRegisterUserGoodMail(t *testing.T) {
	u_good_mail := User{
		Id:         0,                             // uint64    `json:"id"`
		Email:      "good@mail",                   // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string    `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	database.OpenDatabase()
	defer database.CloseDatabase()
	want := "mail"
	if err := u_good_mail.Register(); err != nil && strings.Contains(err.Error(), want) {
		t.Fatalf(`u_good_mail.Register(), output: "%v"; want: "other"`, err)
	}
}

func TestRegisterUserBadPassword(t *testing.T) {
	u_bad_pass := User{
		Id:         1,                             // uint64    `json:"id"`
		Email:      "notbad@mail",                 // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string    `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	want := "password"
	if err := u_bad_pass.Register(); err != nil && !strings.Contains(err.Error(), want) {
		t.Fatalf(`u_bad_pass.Register(), output: "%v"; want: "error"`, err)
	}
}

func TestRegisterUserGoodPassword(t *testing.T) {
	u_good_pass := User{
		Id:         0,                             // uint64    `json:"id"`
		Email:      "notbad@mail",                 // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-15, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string    `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	database.OpenDatabase()
	defer database.CloseDatabase()

	want := "password"
	if err := u_good_pass.Register(); err != nil && strings.Contains(err.Error(), want) {
		t.Fatalf(`u_good_pass.Register(), output: "%v"; want: "other"`, err)
	}
}

func TestRegisterUserGoodCredential(t *testing.T) {
	u_good_cred := User{
		Id:         0,                             // uint64    `json:"id"`
		Email:      "notbad@mail2",                // string    `json:"email"`
		First_name: "",                            // string    `json:"first_name"`
		Last_name:  "",                            // string    `json:"last_name"`
		Born_date:  time.Now().AddDate(-16, 0, 1), // time.Time `json:"date_of_birth"`
		Sexe:       "",                            // string    `json:"Sexe"`
		Status:     "",                            // string    `json:"status"`
		Pseudo:     "",                            // string    `json:"pseudo"`
		Image:      "",                            // string    `json:"image"`
		About:      "",                            // string    `json:"about"`
		Follower:   []uint64{},                    //[]uint64  `json:"follower"`
		Followed:   []uint64{},                    //[]uint64  `json:"followed"`
		Created_at: time.Now(),                    // time.Time `json:"created_at"`
		Updated_at: time.Now(),                    // time.Time `json:"updated_at"`
	}
	// want := "mail: no angle-addr"
	database.OpenDatabase()
	defer database.CloseDatabase()
	if err := u_good_cred.Register(); err != nil {
		t.Fatalf(`u_good_cred.Register(), output: "%v"; want: "nil"`, err)
	}
}
