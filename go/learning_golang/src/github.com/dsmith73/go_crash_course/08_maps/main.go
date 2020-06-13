package main

import (
	"fmt"
)

func main() {
	// // Define map - long
	// emails := make(map[string]string)

	// // Assign kv
	// emails["dan"] = "dsmith73@gmail.com"
	// emails["bob"] = "bob@gmail.com"
	// emails["sharon"] = "sharon@gmail.com"

	// Define map - short
	emails := map[string]string{
		"dan": "dsmith73@gmail.com",
		"bob": "bob@gmail.com",
		"joy": "joy@gmail.com"}

	fmt.Println(emails)
	fmt.Println("There are", len(emails), "in this map, and", emails["dan"], "is dan's email...")

	// Delete from map
	delete(emails, "bob")
	fmt.Println("There are now", len(emails), " emails in this map")
	fmt.Println(emails)

}
