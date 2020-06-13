package main

import (
	"fmt"
)

func greeting(name string) string {
	return "Greetings " + name
}

func getSum(num1 int, num2 int) int { // longhand
	return num1 + num2
}

func multNum(num3, num4 int) int { // shorter-hand
	return num3 * num4
}

func main() {
	// fmt.Println(greeting("Dan"))
	fmt.Println(greeting("Dan"), "\nDid you know that I get", getSum(3, 4), "and I get", multNum(5, 6), " ?")
	fmt.Println("Well, did ya?")
}
