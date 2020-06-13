package main

// need a mux router for this one
// go get -u github.com/gorilla/mux

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/segmentio/ksuid" // https://github.com/segmentio/ksuid
)

// Book struct (model)
type Book struct {
	ID     string  `json:"id"`
	Isbn   string  `json:"isbn"`
	Title  string  `json:"title"`
	Author *Author `json:"author"`
}

// Author struct
type Author struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// init books var as a slice Book struct
var books []Book

// Get All Books
func getBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

// Get Single Book
func getBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // get params
	// loop through books and find with id
	for _, item := range books {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Book{})
}

// Create Book
func createBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var book Book
	uid := ksuid.New()
	uuid := uid.String()

	_ = json.NewDecoder(r.Body).Decode(&book)
	book.ID = uuid
	books = append(books, book)
	json.NewEncoder(w).Encode(book)

}

// Update Book
func updateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range books {
		if item.ID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			var book Book
			_ = json.NewDecoder(r.Body).Decode(&book)
			book.ID = params["id"]
			books = append(books, book)
			json.NewEncoder(w).Encode(book)
			return
		}
	}
	json.NewEncoder(w).Encode(books)
}

// Delete Book
func deleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range books {
		if item.ID == params["id"] {
			books = append(books[:index], books[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(books)
}

func main() {
	// init router
	r := mux.NewRouter()

	// mock data  - @todo - implement DB
	books = append(books, Book{ID: "01", Isbn: "448743", Title: "Learning GOlang", Author: &Author{
		Firstname: "Dan", Lastname: "Smith"}})
	books = append(books, Book{ID: "21", Isbn: "4476543", Title: "Poetry", Author: &Author{
		Firstname: "John", Lastname: "Public"}})
	books = append(books, Book{ID: "16", Isbn: "8744743", Title: "FizzBuzz - algorythm", Author: &Author{
		Firstname: "Jane", Lastname: "Doe"}})
	books = append(books, Book{ID: "14", Isbn: "9872364", Title: "PushPop - Ode to Asslember", Author: &Author{
		Firstname: "Danielle", Lastname: "Bustamante"}})

	// Route handlers / Endpoints
	r.HandleFunc("/api/books", getBooks).Methods("GET")
	r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
	r.HandleFunc("/api/books", createBook).Methods("POST")
	r.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
	r.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))

}
