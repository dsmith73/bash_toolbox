package main

import (
	"fmt"
	"strconv"
)

// Define person struct
type Person struct {
	firstName string
	lastName  string
	city      string
	state     string
	country   string
	gender    string
	age       int
	email     string
	phone     string
}

// Greeting method (value receiver)
func (p Person) greet() string {
	return "Hello, my name is " + p.firstName + " " + p.lastName + " and I am " + strconv.Itoa(p.age)
}

// hasBirthday method (pointer receiver)
func (p *Person) hasBirthday() {
	p.age++
}

// getMarried (pointer receiver)
func (p *Person) getMarried(spouseLastName string) {
	if p.gender == "m" {
		return
	} else if p.gender == "f" {
		p.lastName = spouseLastName
	} else {
		fmt.Printf("Check your genders! You passed me %s, and I expected \"f\" or \"m\"\n", p.gender)
	}
}

func main() {
	// init person usinf struct
	person1 := Person{
		firstName: "dan",
		lastName:  "smith",
		city:      "indianapolis",
		state:     "in",
		country:   "us",
		gender:    "m",
		age:       73,
		email:     "dsmith73@gmail.com",
		phone:     "7077022126"}

	// Alternative
	person2 := Person{
		"danielle",
		"concepcion",
		"indianapolis",
		"in",
		"us",
		"f",
		46,
		"chada1370@yahoo.com",
		"3177022835"}

	fmt.Println(person1)
	fmt.Println("first_name :", person1.firstName)
	fmt.Println("last_name :", person1.lastName)
	fmt.Println("city :", person1.city)
	fmt.Println("state :", person1.state)
	fmt.Println("country :", person1.country)
	fmt.Println("gender :", person1.gender)
	fmt.Println("age :", person1.age)
	fmt.Println("email :", person1.email)
	fmt.Println("phone :", person1.phone)
	person1.age++
	fmt.Printf("Increased the age for %s\nThe new age is %d\n", person1.firstName, person1.age)

	person1.hasBirthday()
	person1.getMarried("concepcion")
	person2.getMarried("smith")

	fmt.Println(person1.greet())
	fmt.Println(person2.greet())
}
