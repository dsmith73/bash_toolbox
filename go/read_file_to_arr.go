 package main

 import (
 	"fmt"
 	"io/ioutil"
 	"os"
 	"strings"
 )

 func main() {
 	if len(os.Args) <= 1 {
 		fmt.Printf("USAGE : %s <target_filename> \n", os.Args[0])
 		os.Exit(0)
 	}

 	fileName := os.Args[1]

 	fileBytes, err := ioutil.ReadFile(fileName)

 	if err != nil {
 		fmt.Println(err)
 		os.Exit(1)
 	}

 	sliceData := strings.Split(string(fileBytes), "\n")

 	fmt.Println(sliceData)
 }
 
