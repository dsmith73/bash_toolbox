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
 	strList := []string{"Hello", "World", "GoodBye", "World", "We", "Love", "Love", "You"}

 	printslice(strList)

 	if !stringInSlice("Save", strList) {
 		fmt.Println("The word Save is not in the list!")
 	}

 	if stringInSlice("Love", strList) {
 		fmt.Println("The word Love is in the list!")
 	}

 }
 
