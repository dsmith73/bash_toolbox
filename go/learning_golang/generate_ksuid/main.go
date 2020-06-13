package main

import (
	"fmt"

	"github.com/segmentio/ksuid" // https://github.com/segmentio/ksuid
)

func main() {
	uid := ksuid.New()
	uuid := uid.String()
	fmt.Printf("uid : %d\n", uid)
	fmt.Printf("uuid : %s\n", uuid)
	fmt.Printf("type : %T\n", uuid)
	fmt.Println("from : https://github.com/segmentio/ksuid")
}
