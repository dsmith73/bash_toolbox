 package main

 import (
         "fmt"
         "strings"
 )

 func main() {

         strWithDashes := "0-201-53377-4"

         // remove all dashes
         // -1 means, all occurrences

         noDashes := strings.Replace(strWithDashes, "-", "", -1)

         fmt.Println("Before : ", strWithDashes)
         fmt.Println("After : ", noDashes)

 }
 
