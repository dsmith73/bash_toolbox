package main

 import (
         "bufio"
         "fmt"
         "io"
         "os"
         "os/user"
         "strings"
 )

 var Users []string

 func main() {

         // this is for Linux/Unix machines
         // for Windows
         // see https://www.nextofwindows.com/the-net-command-line-to-list-local-users-and-groups
         file, err := os.Open("/etc/passwd")

         if err != nil {
                 fmt.Println(err)
                 os.Exit(1)
         }

         defer file.Close()

         reader := bufio.NewReader(file)

         for {
                 line, err := reader.ReadString('\n')

                 // skip all line starting with #
                 if equal := strings.Index(line, "#"); equal < 0 {
                         // get the username and description
                         lineSlice := strings.FieldsFunc(line, func(divide rune) bool {
                                 return divide == ':' // we divide at colon
                         })

                         if len(lineSlice) > 0 {
                                 Users = append(Users, lineSlice[0])
                         }

                 }

                 if err == io.EOF {
                         break
                 }
                 if err != nil {
                         fmt.Println(err)
                         os.Exit(1)
                 }

         }

         // now we have a list of users
         // iterate(cycle) each of them to
         // print out HomeDir, GroupID, description, etc

         for _, name := range Users {

                 usr, err := user.Lookup(name)
                 if err != nil {
                         panic(err)
                 }

                 // see https://golang.org/pkg/os/user/#User
                 fmt.Printf("username:%s\n", usr.Username)
                 fmt.Printf("homedir:%s\n", usr.HomeDir)
                 fmt.Printf("groupID:%s\n", usr.Gid)
                 fmt.Printf("DisplayName:%s\n", usr.Name)
                 fmt.Println("*********************************")

         }

 }
