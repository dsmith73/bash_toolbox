 package main

 import (
 	"fmt"
 	"os"
 	"strconv"
 	"time"
 )

 func main() {

 	unixTimeStamp := "1432572732"

 	unixIntValue, err := strconv.ParseInt(unixTimeStamp, 10, 64)

 	if err != nil {
 		fmt.Println(err)
 		os.Exit(1)
 	}

 	timeStamp := time.Unix(unixIntValue, 0)

 	fmt.Println(timeStamp)
 }
 
