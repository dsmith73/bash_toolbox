 package main

 import (
         "fmt"
         "io/ioutil"
         "net/http"
 )

 func Home(w http.ResponseWriter, r *http.Request) {
         w.Write([]byte("use curl command!"))
 }

 func HandleJSON(w http.ResponseWriter, r *http.Request) {
         // get JSON POST data
         json, err := ioutil.ReadAll(r.Body)
         if err != nil {
                 panic(err)
         }
         fmt.Println(string(json))

         // see how to unmarshal json data
         // at https://www.socketloop.com/tutorials/golang-unmarshal-json-from-http-response

         // this will echo back to curl
         //w.Write([]byte(string(json)))
 }

 func main() {
         http.HandleFunc("/", Home)
         http.HandleFunc("/api/login", HandleJSON)
         http.ListenAndServe(":8888", nil)
 }
 
