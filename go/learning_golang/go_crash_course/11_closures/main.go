package main

import (
	"fmt"
)

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	sum := adder()
	fmt.Printf("Closures:\nTo demonstrate, this will execute a \"for loop\" which\nincriments \"i\" and adds it to the running sum.\nFor instance; 0+1=1, then 1+1=2+1=3\nthen 1+2=3+3=6... etc...")
	for i := 0; i < 10; i++ {
		fmt.Println(sum(i))
	}
}
