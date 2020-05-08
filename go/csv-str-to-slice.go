 package main

 import (
         "fmt"
         "strings"
 )

 func main() {

         str := "A,B,C,D"

         fmt.Println(str)

         // first, clean/remove the comma
         cleaned := strings.Replace(str, ",", " ", -1)

         // convert 'clened' comma separated string to slice
         strSlice := strings.Fields(cleaned)

         fmt.Println(strSlice)

         //NOTE : If we don't clean/remove the comma from the string
         //       the resultant strSlice will look like a slice but....
         //       you won't be able to perform operation on it
         //       such as strSlice[:1]

         fmt.Println(strSlice[:1]) // test if this is a SLICE or not

 }
 
