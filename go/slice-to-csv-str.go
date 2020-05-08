 package main

 import (
         "fmt"
         "strings"
 )

 func main() {

         strSlice := []string{"A", "B", "C", "D"}

         fmt.Println(strSlice)

         // convert slice back to comma-separated string
         str := strings.Join(strSlice, ",")

         fmt.Println(str)
 }
 
