package handlers

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type Hello struct {
	l *log.Logger
}

func NewHello(l *log.Logger) *Hello {
	return &Hello{l}
}

func (h *Hello) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	// log.Println("Hello World")
	h.l.Println("Hello World")

	d, err := ioutil.ReadAll(r.Body)
	// Handle ERRORs
	if err != nil {
		// Short hand
		http.Error(rw, "Oops!", http.StatusBadRequest)
		/* Long hand
		rw.WriteHeader(http.StatusBadRequest)
		rw.Write([]byte("Oops!"))
		*/
		return
	}
	// print out what was sent in the request
	// log.Printf("Data %s", d)

	// print out to response writer
	fmt.Fprintf(rw, "Hello %s", d)

}
