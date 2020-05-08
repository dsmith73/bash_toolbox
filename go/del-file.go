 package main

 import (
         "flag"
         "os"
         "path/filepath"
         "strings"
 )

 var flagPath = flag.String("path", "", "path to walk in search for dumb_* files to delete.")

 func deletefiles(path string, f os.FileInfo, err error) (e error) {

         // check each file if starts with the word "dumb_"
         if strings.HasPrefix(f.Name(), "dumb_") {
                 os.Remove(path)
         }
         return

         // See https://www.socketloop.com/tutorials/golang-delete-files-by-extension
         // on how to delete file by extension

 }

 func init() {
         flag.Parse()
 }

 func main() {

         // check if the user specify a path
         if *flagPath == "" {
                 flag.Usage() // if no, prompt usage
                 os.Exit(0)   // and exit
         }

         // walk through the files in the given path and perform partialrename()
         // function
         filepath.Walk(*flagPath, deletefiles)
 }
 
