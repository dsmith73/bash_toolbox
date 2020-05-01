 package main

 import (
         "fmt"
         "net"
         "strings"
 )

 func ReverseIPAddress(ip net.IP) string {

         if ip.To4() != nil {
                 // split into slice by dot .
                 addressSlice := strings.Split(ip.String(), ".")
                 reverseSlice := []string{}

                 for i := range addressSlice {
                         octet := addressSlice[len(addressSlice)-1-i]
                         reverseSlice = append(reverseSlice, octet)
                 }

                 // sanity check
                 //fmt.Println(reverseSlice)

                 return strings.Join(reverseSlice, ".")

         } else {
                 panic("invalid IPv4 address")
         }
 }

 func main() {

         ipAddress := net.ParseIP("106.10.138.240")

         fmt.Println("Before : ", ipAddress.To4())

         reverseIpAddress := ReverseIPAddress(ipAddress)

         fmt.Println("After : ", reverseIpAddress)

         // convert to DNS reverse record form
         reverseIpAddress = reverseIpAddress + ".in-addr.arpa"

         fmt.Println("With in-addr.arpa : ", reverseIpAddress)

 }
