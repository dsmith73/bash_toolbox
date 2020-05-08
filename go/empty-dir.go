 package main

 import (
         "fmt"
         "io"
         "os"
 )

 func IsDirEmpty(name string) (bool, error) {
         f, err := os.Open(name)
         if err != nil {
                 return false, err
         }
         defer f.Close()

         // read in ONLY one file
         _, err = f.Readdir(1)

         // and if the file is EOF... well, the dir is empty.
         if err == io.EOF {
                 return true, nil
         }
         return false, err
 }

 func main() {
         ok, err := IsDirEmpty("./")

         if err != nil {
                 fmt.Println(err)
         }

         fmt.Println("Current directory is empty? : ", ok)

         ok, err = IsDirEmpty("./emptydir")

         if err != nil {
                 fmt.Println(err)
         }

         fmt.Println("EmptyDir directory is empty? : ", ok)

 }
 
