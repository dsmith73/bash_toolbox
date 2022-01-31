// GO API for calculating Easter
//	- /easter/{YYYY}
// Easter date for a given year in the Gregorian calendar
// (1583 and onward) using the Gauss Algorithm

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

// Struct to format the data
type Easter struct {
	Date string `json:"Easter"`
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<head><style>@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap'); body {font-family: 'Share Tech Mono', monospace;}</style></head><body bgcolor=\"#000000\"><font color=\"orange\"><div align=center><br><h1>Welcome to the HoneyPot</h1><hr width=30% height=3px ><br></div></font></body>")

}

func gaussEaster(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	var easter Easter
	// convert STR input to INT
	year, _ := strconv.Atoi(vars["year"])

	// fmt.Println(year)
	// don't go below start of Gregorian calendar
	if year < 1583 {
		year = 1583
	}

	month := 3
	golden := (year % 19) + 1
	century := year/100 + 1
	// correct for the years that are not leap years
	xx := (3*century)/4 - 12
	// moon correction
	yy := (8*century+5)/25 - 5
	// find Sunday
	zz := (5*year)/4 - xx - 10
	// determine epact - age of moon on January 1st of that year (follows a cycle of 19 years)
	ee := (11*golden + 20 + yy - xx) % 30
	if ee == 24 {
		ee += 1
	}
	if (ee == 25) && (golden > 11) {
		ee += 1
	}
	// get the full moon
	moon := 44 - ee
	if moon < 21 {
		moon += 30
	}
	// up to Sunday
	day := (moon + 7) - ((zz + moon) % 7)
	if day > 31 {
		day -= 31
		month = 4
	}

	var m, _ = strconv.Atoi(strconv.Itoa(month))

	easter.Date = (time.Date(year, time.Month(m), day, 0, 0, 0, 0, time.UTC)).String()

	json.NewEncoder(w).Encode(easter)
	defer r.Body.Close()
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	// Implement the endpoint
	myRouter.HandleFunc("/easter/{year}", gaussEaster).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main() {

	handleRequests()

}
