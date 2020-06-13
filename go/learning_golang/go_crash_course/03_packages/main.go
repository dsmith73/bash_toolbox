package main

import (
	"fmt"
	"math"

	"../03_packages/strutil"
)

func main() {
	fmt.Println(math.Floor(2.7)) // round down
	fmt.Println(math.Ceil(2.7))  // round up
	fmt.Println(math.Sqrt(16))   // square root

	fmt.Println(strutil.Reverse("olleh"))
}
