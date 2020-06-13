package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

type User struct {
	Username string `json: "username,omitempty"`
	Password string `json: "password,omitempty"`
	Email    string `json: "email,omitempty"`
}

type UserDB struct {
	Users []User `json: "users,omitempty"`
	Type  string `json: "type,omitempty"`
}

func main() {
	// uncomment this line to read json from the db
	// and create a file from the data - user.db.json
	// createJsonFile()

	// uncomment this line to read json from a file - user.db.json
	// and send it to the db
	readJsonFile()

}

func createJsonFile() {
	users := []User{
		{
			Username: "dsmith73",
			Password: "change me",
			Email:    "dsmith73@gmail.com",
		},
		{
			Username: "chada1370",
			Password: "please change me",
			Email:    "chada1370@yahoo.com",
		},
	}

	db := UserDB{Users: users, Type: "simple"}

	// fmt.Println(users)

	var buf = new(bytes.Buffer)

	enc := json.NewEncoder(buf)
	enc.Encode(db)

	f, err := os.Create("user.db.json")
	if nil != err {
		log.Fatalln(err)
	}
	defer f.Close()

	//io.Copy(os.Stdout, buf)
	io.Copy(f, buf)
}

func readJsonFile() {

	f, err := os.Open("user.db.json")
	if nil != err {
		log.Fatalln(err)
	}
	defer f.Close()

	dec := json.NewDecoder(f)

	db := UserDB{}
	dec.Decode(&db)
	fmt.Println(db)
}
