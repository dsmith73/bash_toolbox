// DNS resolution

package dns

import (
	"fmt"
	"net"
	"strings"
)

// Website struct takes an input of website name,
// performs a DNS lookup, and returns an IP address
type Website struct {
	name string
}

func Lookup(Website) {
	var website Website
	ip, err := net.LookupHost(website.name)

	if err != nil {
		fmt.Println(err)
	}

	address := strings.Join(ip, "")

	fmt.Println(address)

	return

}

// func main() {
// 	Lookup()

// }
