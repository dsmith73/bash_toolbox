 package main

 import (
     "fmt"
     "os"
 )

 func main() {
     file := "file.txt"
     info,_ := os.Stat(file)
     mode := info.Mode()

     fmt.Println(file, "mode is " ,  mode)

 }
 
