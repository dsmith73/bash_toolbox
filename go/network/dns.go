// DNS resolution

package dns

import (
	"fmt"
	"net"
	"strings"
)

func Lookup(Website string) {

	ip, err := net.LookupHost(Website)

	if err != nil {
		fmt.Println(err)
	}

	address := strings.Join(ip, "")

	fmt.Println(address)

	return

}

// func main() {
// 	site := "dsmith73.duckdns.org"
// 	Lookup(site)

// }
