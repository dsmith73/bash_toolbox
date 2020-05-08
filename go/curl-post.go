 package main

 import (
         "fmt"
         "net/http"
 )

 func Home(w http.ResponseWriter, r *http.Request) {
         w.Write([]byte("use curl command!"))
 }

 func HandleLogin(w http.ResponseWriter, r *http.Request) {
         // get the POST data
         username := r.PostFormValue("username")
         password := r.PostFormValue("password")

         received := username + " " + password
         fmt.Println(received)
         w.Write([]byte(received))
 }

 func main() {
         http.HandleFunc("/", Home)
         http.HandleFunc("/api/login", HandleLogin)
         http.ListenAndServe(":8888", nil)
 }
 
