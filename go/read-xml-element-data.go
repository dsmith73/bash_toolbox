 package main

 import (
         "encoding/xml"
         "fmt"
         "strings"
 )

 var XMLdata = `<urlset>
  <url>
     <loc>http://www.example.com/xml-element-golang</loc>
     <lastmod>2015-06-14</lastmod>
     <changefreq>daily</changefreq>
     <priority>0.5</priority>
  </url>
  <url>
     <loc>http://www.example.com/extract-element-by-for-loop</loc>
     <lastmod>2015-06-14</lastmod>
     <changefreq>daily</changefreq>
     <priority>0.5</priority>
  </url>
  <urlset>`

 // ignore <loc>, only use chardata because DecodeElement will work on <loc>

 type XMLQuery struct {
         Loc string `xml:",chardata"`
 }

 var l XMLQuery

 func main() {

         // example on handling XML chardata(string)
         decoder := xml.NewDecoder(strings.NewReader(string(XMLdata)))

         for {

                 // err is ignore here. IF you are reading from a XML file
                 // do not ignore err and also check for io.EOF
                 token, _ := decoder.Token()

                 if token == nil {
                         break
                 }

                 switch Element := token.(type) {
                 case xml.StartElement:
                         if Element.Name.Local == "loc" {
                                 fmt.Println("Element name is : ", Element.Name.Local)

                                 err := decoder.DecodeElement(&l, &Element)
                                 if err != nil {
                                         fmt.Println(err)
                                 }

                                 fmt.Println("Element value is : ", l.Loc)
                         }

                         // print out the element data
                         // convert to []byte slice and cast to string type

                 case xml.CharData:
                         str := string([]byte(Element))
                         fmt.Println(str)
                 }
         }
 }
 
