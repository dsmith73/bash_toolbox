 package main

 import (
         "fmt"
         "net"
 )
// check if an ip address is v4 or v6  

 func ip4or6(s string) string {
         for i := 0; i < len(s); i++ {
                 switch s[i] {
                 case '.':
                         return "version 4"
                 case ':':
                         return "version 6"
                 }
         }
         return "unknown"

 }

 func main() {

         var ipAddress string = "192.168.0.1"
         //sanity check
         testInput := net.ParseIP(ipAddress)

         if testInput.To4() == nil {
                 fmt.Printf("%v is not a valid IPv4 address\n", testInput)
         }

         fmt.Printf("%s is IP address of : %s \n", ipAddress, ip4or6(ipAddress))

         var ip6Address string = "FE80::0202:B3FF:FE1E:8329"
         //sanity check
         testInputIP6 := net.ParseIP(ip6Address)

         if testInputIP6.To16() == nil {
                 fmt.Printf("%v is not a valid IP address\n", testInputIP6)
         }

         fmt.Printf("%s is IP address of : %s \n", ip6Address, ip4or6(ip6Address))

         var ip6AddressURLPort string = "http://[2001:db8:0:1]:80"
         //sanity check
         testInputIP6URLPort := net.ParseIP(ip6AddressURLPort)

         if testInputIP6URLPort.To16() == nil {
                 fmt.Printf("%v is not a valid IP address\n", ip6AddressURLPort)
         }

         fmt.Printf("%s is IP address of : %s \n", ip6AddressURLPort, ip4or6(ip6AddressURLPort))

 }
