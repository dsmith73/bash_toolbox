package main

import (
	"fmt"
)

func main() {
	// Arrays
	// var fruitArr [2]string

	//Assign values  - longhand
	// fruitArr[0] = "Apple"
	// fruitArr[1] = "Orange"
	//Assign values  - shorthand
	fruitArr := [2]string{
		"Apple",
		"Orange"}

	fruitSlice := []string{
		"Apple",
		"Orange",
		"Grape",
		"Cherry"}

	fmt.Println("You have", len(fruitSlice), "items in your Fruit Slice, and your fruit slices are :", fruitSlice)
	fmt.Println("You also have :", len(fruitArr), "items in your Fruit Array, while the 2nd item is :", fruitArr[1])
	fmt.Println("The 2nd and 3rd items in your Fruit Slice are :", fruitSlice[1:3])
}
