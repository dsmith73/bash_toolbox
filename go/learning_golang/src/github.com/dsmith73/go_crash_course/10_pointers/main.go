package main

import (
	"fmt"
)

func main() {
	// Point to the memory address or the location of a value
	a := 5
	b := &a

	fmt.Printf("Pointers:\na : %d\nb : %d\nb points to the memory address of a\n", a, b)
	fmt.Printf("The types of variables are:\na : %T\nb : %T\nThe * represents a Pointer to a memory address\n", a, b)

	// Use * to read value from memory address
	fmt.Printf("\nUsing *b gives us the value in the memory address\n*b : %d\nWhereas just calling b gives us the memory address itself\nb : %d\n", *b, b)
	fmt.Printf("\nSince *b gives us the value of a\nWe can also access this with *&a\n&a : %d\n*&a : %d\n", &a, *&a)
	fmt.Printf("\nOR, the complex view...\na : %d\n*b : %d\n*&a : %d\nb : %d\n&a : %d\n", a, *b, *&a, b, &a)

	// Change value with pointer
	*b = 10
	fmt.Printf("\nYou can change the value of \"a\" by updating the pointer with \"b\"\nHere, we're updating the value through *b\na : %d\n", a)

}
