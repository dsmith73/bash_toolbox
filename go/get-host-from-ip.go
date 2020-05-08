 package main

 import (
         "fmt"
         "net"
         "os"
         "strconv"
         "strings"
         "time"
 )

 func getHostName(host chan string, ipAddress string, n int) {
         ip := ipAddress + strconv.Itoa(n)

         if addr, err := net.LookupAddr(ip); err == nil {
                 host <- ip + " -" + addr[0]
         } else {
                 host <- "err " + err.Error()
         }
 }

 func main() {
         if len(os.Args) != 2 {
                 fmt.Fprintf(os.Stderr, "Usage: %s IP-address\n", os.Args[0])
                 os.Exit(1)
         }

         ipAddr := os.Args[1]

         segments := strings.SplitAfter(ipAddr, ".")

         ipAddress := segments[0] + segments[1] + segments[2]

         haveHost := make(chan string)

         max := 55

         for counter := 0; counter < max; counter++ {
                 go getHostName(haveHost, ipAddress, counter)
         }

         count := 0

         timeOut := time.After(5 * time.Second)

 lookups:
         for {

                 select {

                 case host := <-haveHost:
                         fmt.Println("host :" + host)
                 case <-timeOut:
                         fmt.Println("time out")
                         break lookups
                 }
                 count++

                 if count == max {
                         break
                 }

         }

         fmt.Println("Network scanned")

 }
 
