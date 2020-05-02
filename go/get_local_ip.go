 package main

 import (
         "fmt"
         "net"
         "os"
 )
// non loopback IP

 func main() {

         addrs, err := net.InterfaceAddrs()

         if err != nil {
                 fmt.Println(err)
                 os.Exit(1)
         }

         for _, address := range addrs {

               // check the address type and if it is not a loopback the display it
               if ipnet, ok := address.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
                  if ipnet.IP.To4() != nil {
                     fmt.Println(ipnet.IP.String())
                  }

               }
         }

 }
