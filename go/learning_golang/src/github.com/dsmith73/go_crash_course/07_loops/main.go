package main

import (
	"fmt"
)

func main() {
	// // long method
	// i := 1
	// for i <= 10 {
	// 	fmt.Println(i)
	// 	// i = i + 1
	// 	i++
	// }

	// short method
	for i := 1; i <= 10; i++ {
		fmt.Printf("Num : %d\n", i)
	}

	// FizzBuzz
	for i := 1; i <= 100; i++ {
		if i%15 == 0 {
			fmt.Printf("%d : FizzBuzz\n", i)
		} else if i%3 == 0 {
			fmt.Printf("%d : Fizz\n", i)
		} else if i%5 == 0 {
			fmt.Printf("%d : Buzz\n", i)
		} else {
			fmt.Println(i)
		}
	}

	// PushPop - ode to Assembler
	for i := 1; i <= 100; i++ {
		if i%20 == 0 {
			fmt.Printf("%d : PushPop\n", i)
		} else if i%4 == 0 {
			fmt.Printf("%d : Push\n", i)
		} else if i%5 == 0 {
			fmt.Printf("%d : Pop\n", i)
		} else {
			fmt.Println(i)
		}
	}
}
