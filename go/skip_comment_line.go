 package main

 import (
         "bufio"
         "fmt"
         "io"
         "os"
         "strings"
 )

 func main() {
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
                         fmt.Print(line)
                 }

                 // alternatively, only print line starting with #
                 //if equal := strings.Index(line, "#"); equal >= 0 {
                 //              fmt.Print(line)
                 //      }

                 if err == io.EOF {
                         break
                 }
                 if err != nil {
                         fmt.Println(err)
                         os.Exit(1)
                 }

         }

 }
