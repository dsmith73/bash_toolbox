package main

import (
	"fmt"
)

func main() {
	x := 10
	y := 10

	if x <= y {
		fmt.Printf("%d is less than or equal to %d\n", x, y)
	} else {
		fmt.Printf("%d is less than %d\n", y, x)
	}

	//else if
	color := "green"

	if color == "red" { // use %s for string variables
		fmt.Printf("color is %s\n", color)
	} else if color == "blue" {
		fmt.Printf("The color is %s\n", color)
	} else {
		fmt.Printf("The color is %s, which does NOT match red or blue\n", color)
	}

	// Switch
	switch color {
	case "red":
		fmt.Printf("Switch says \"The color is %s\"\n", color)
	case "green":
		fmt.Printf("Switch says \"The color is %s\"\n", color)
	default:
		fmt.Printf("Switch says \"The color is %s, which is NOT red or green\"\n", color)
	}
}
