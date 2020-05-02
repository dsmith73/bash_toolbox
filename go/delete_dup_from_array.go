 package main

 import (
 	"fmt"
 )

 func printslice(slice []string) {
 	fmt.Println("slice = ", slice)
 	//for i := range slice {
   //		fmt.Println(i, slice[i])
 	//}
 }

 func stringInSlice(str string, list []string) bool {
 	for _, v := range list {
 		if v == str {
 			return true
 		}
 	}
 	return false
 }

 func main() {
 	duplicate := []string{"Hello", "World", "GoodBye", "World", "We", "Love", "Love", "You"}

 	printslice(duplicate)

 	//need to delete duplicate data from slice
 	// the idea is to copy data over to a new slice without the duplicate

 	cleaned := []string{}

 	for _, value := range duplicate {

 		if !stringInSlice(value, cleaned) {
 			cleaned = append(cleaned, value)
 		}
 	}

 	printslice(cleaned)
 }
 
