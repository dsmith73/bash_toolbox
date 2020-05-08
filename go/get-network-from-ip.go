 package main

 import (
         "fmt"
         "net"
         "os"
 )

 func main() {
         if len(os.Args) != 2 {
                 fmt.Fprintf(os.Stderr, "Usage: %s hostname\n", os.Args[0])
                 os.Exit(1)
         }

         hostname := os.Args[1]

         IPAddr, err := net.ResolveIPAddr("ip", hostname)
         if err != nil {
            fmt.Println("Error in resolving IP")
            os.Exit(1)
         }


         addr := net.ParseIP(IPAddr.String())

         if addr == nil {
                 fmt.Println("Invalid address")
                 os.Exit(1)
         }
         mask := addr.DefaultMask()
         network := addr.Mask(mask)

         fmt.Printf("Address : %s \n Network : %s \n", addr.String(), network.String())
 }
 
