package main

import (
	"fmt"
	"net/http"
)

//main page
func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<head></head><body bgcolor=#737373><h1 color=#50fa50>Hola craziness</h1><br><hr><p>How are you doing today?</p></body>")
}

//about
func about(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<head></head><body bgcolor=#737373><h1 color=#50fa50>Learn all about me</h1><br><hr><p>Not too much to say...<br>#YAY4THAT</p></body>")
}

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/about", about)
	fmt.Println("Server starting...")
	http.ListenAndServe(":3000", nil)
}
