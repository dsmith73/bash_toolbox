 package main

 import (
         "encoding/json"
         "encoding/xml"
         "fmt"
         "io/ioutil"
         "os"
 )

 type jsonStaff struct {
         ID        int
         FirstName string
         LastName  string
         UserName  string
 }

 type Staff struct {
         XMLName   xml.Name `xml:"staff"`
         ID        int      `xml:"id"`
         FirstName string   `xml:"firstname"`
         LastName  string   `xml:"lastname"`
         UserName  string   `xml:"username"`
 }

 type Company struct {
         XMLName xml.Name `xml:"company"`
         Staffs  []Staff  `xml:"staff"`
 }

 func (s Staff) String() string {
         return fmt.Sprintf("\t ID : %d - FirstName : %s - LastName : %s - UserName : %s \n", s.ID, s.FirstName, s.LastName, s.UserName)
 }

 func main() {
         xmlFile, err := os.Open("Employees.xml")
         if err != nil {
                 fmt.Println("Error opening file:", err)
                 return
         }
         defer xmlFile.Close()

         XMLdata, _ := ioutil.ReadAll(xmlFile)

         var c Company
         xml.Unmarshal(XMLdata, &c)

         // sanity check - XML level
         fmt.Println(c.Staffs)

         // convert to JSON
         var oneStaff jsonStaff
         var allStaffs []jsonStaff

         for _, value := range c.Staffs {
                 oneStaff.ID = value.ID
                 oneStaff.FirstName = value.FirstName
                 oneStaff.LastName = value.LastName
                 oneStaff.UserName = value.UserName

                 allStaffs = append(allStaffs, oneStaff)
         }

         jsonData, err := json.Marshal(allStaffs)

         if err != nil {
                 fmt.Println(err)
                 os.Exit(1)
         }

         // sanity check - JSON level

         fmt.Println(string(jsonData))

         // now write to JSON file

         jsonFile, err := os.Create("./Employees.json")

         if err != nil {
                 fmt.Println(err)
         }
         defer jsonFile.Close()

         jsonFile.Write(jsonData)
         jsonFile.Close()

 }
 
