package database

import (
	"database/sql"
	"fmt"
	"log"
	"runtime"
	"strings"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/mattn/go-sqlite3"
)

var Database *sql.DB

// open and apply migration if is not already open
func OpenDatabase() {
	// Return if already open
	if Database != nil {
		return
	}
	base_pass := func() string {
		_, bp, _, _ := runtime.Caller(0)
		return strings.Split(bp, "database.go")[0]
	}()

	fmt.Printf("base_pass: %v\n", base_pass)

	// database connection string
	dbConnStr := fmt.Sprintf("file://%sdatabase.db", base_pass)

	// Create a new SQLite database connection
	var err error
	Database, err = sql.Open("sqlite3", dbConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}
	// defer database.Close()

	// Create a new instance of the SQLite database driver
	driver, err := sqlite3.WithInstance(Database, &sqlite3.Config{})
	if err != nil {
		log.Fatalf("Failed to create SQLite database driver instance: %v", err)
	}
	// Create a new migrate instance with the SQLite driver
	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%smigrations", base_pass),
		"sqlite3", driver)
	if err != nil {
		log.Fatalf("Failed to create migrate instance: %v", err)
	}
	// Apply all available migrations
	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Failed to apply migrations: %v", err)
	}

	fmt.Println("Migrations applied successfully!")
	// Perform other database operations...
}

// close database
func CloseDatabase() {
	if Database == nil {
		return
	}
	Database.Close()
	Database = nil
}
