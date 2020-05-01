 package main

 import (
 	"bufio"
 	"fmt"
 	"io"
 	"os"
 	"strings"
 )

 type Config map[string]string

 func ReadConfig(filename string) (Config, error) {
     // init with some bogus data
 	config := Config{
 		"port":           "8888",
 		"password":       "abc123",
 		"ip":             "127.0.0.1",
 	}
 	if len(filename) == 0 {
 		return config, nil
 	}
 	file, err := os.Open(filename)
 	if err != nil {
 		return nil, err
 	}
 	defer file.Close()
 	
 	reader := bufio.NewReader(file)
 	
 	for {
 		line, err := reader.ReadString('\n')
 		
 		// check if the line has = sign
             // and process the line. Ignore the rest.
 		if equal := strings.Index(line, "="); equal >= 0 {
 			if key := strings.TrimSpace(line[:equal]); len(key) > 0 {
 				value := ""
 				if len(line) > equal {
 					value = strings.TrimSpace(line[equal+1:])
 				}
                             // assign the config map
 				config[key] = value
 			}
 		}
 		if err == io.EOF {
 			break
 		}
 		if err != nil {
 			return nil, err
 		}
 	}
 	return config, nil
 }

 func main() {
         // for this tutorial, we will hard code it to config.txt
 	config, err := ReadConfig(`config.txt`)

 	if err != nil {
 		fmt.Println(err)
 	}

 	//fmt.Println("Config data dump :", config)

 	// assign values from config file to variables
 	ip := config["ip"]
 	pass := config["password"]
 	port := config["port"]

 	fmt.Println("IP :", ip)
 	fmt.Println("Port :", port)
 	fmt.Println("Password :", pass)
 }
