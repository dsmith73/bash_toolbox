 package main

 import (
 	"fmt"
 	"strings"
 )

 func main() {

 	username := strings.Split("iamspammer@gmail.com", "@")
 	fmt.Printf("%q\n", username[0])
 }
 
