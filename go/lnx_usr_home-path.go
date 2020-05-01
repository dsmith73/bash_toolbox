package main

 import (
         "fmt"
         "os/user"
 )

 func main() {

         //usr, err := user.Current()

         usr, err := user.Lookup("dude")


         if err != nil {
                 panic(err)
         }

         fmt.Println("Dude username is : ", usr.Username)

         fmt.Println("Name : ", usr.Name)

         fmt.Println("User's home directory is : ", usr.HomeDir)
 }
