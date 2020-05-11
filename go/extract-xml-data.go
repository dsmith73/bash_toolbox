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

 var XMLdata2 = `<ALEXA VER="0.9" URL="socketloop.com/" HOME="0" AID="=" IDN="socketloop.com/">
  <SD>
      <POPULARITY URL="socketloop.com/" TEXT="291466" SOURCE="panel"/>
      <REACH RANK="237320"/>
      <RANK DELTA="+31735"/>
      <COUNTRY CODE="US" NAME="United States" RANK="191742"/>
  </SD>
  </ALEXA>`

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
 		}
 	}

 	fmt.Println("------------------------------------")

 	// example on handling XML attribute
 	decoder = xml.NewDecoder(strings.NewReader(string(XMLdata2)))

 	for {

 		// err is ignore here. IF you are reading from a XML file
 		// do not ignore err and also check for io.EOF
 		token, _ := decoder.Token()

 		if token == nil {
 			break
 		}

 		switch Element := token.(type) {
 		case xml.StartElement:
 			if Element.Name.Local == "REACH" {
 				fmt.Println("Element name is : ", Element.Name.Local)
 				attrName := Element.Attr[0].Name.Local
 				attrValue := Element.Attr[0].Value
 				fmt.Printf("Attribute name is [%s] and value is [%s] \n", attrName, attrValue)
 			}
 		}
 	}

 }
 
