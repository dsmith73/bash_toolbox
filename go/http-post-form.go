 package main

 import (
         "fmt"
         "net/http"
         "net/url"
 )

 func main() {

         urlData := url.Values{}
         urlData.Set("search_query", "pixar")

         resp, err := http.PostForm("https://www.youtube.com/results?search_query=", urlData)

         if err != nil {
                 fmt.Println(err)
         }

         fmt.Println("Status : ", resp.Status)

 }
 
