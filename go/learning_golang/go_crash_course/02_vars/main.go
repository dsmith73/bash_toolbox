package main

import "fmt"

// using the var keyword
var isCool bool = false

func main() {
	// MAIN TYPES
	// string
	// bool
	// int
	// int 	int8 	int16 	int32 	int64
	// uint uint8 	uint16 	uint32 	uint64 	uintptr
	// byte - alias for uint8
	// rune - alias for int32
	// float32 float64
	// complex64 complex128

	// var shorthand
	age, weight := 37, 225 // int inferred
	height := 6.3          // float64 inferred
	name, email := "Brad", "Brad@email_domain.com"

	fmt.Println("Name :", name, "\nAge :", age, "\nHeight :", height, "\nWeight :", weight, "\nEMail :", email)

	fmt.Printf("%T\n", isCool)

}
