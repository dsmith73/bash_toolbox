package main

/*
// Get multiple locations data from openweathermap
// http://api.openweathermap.org/data/2.5/group?id=5879400&units=imperial&appid=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
*/

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

// WeatherData struct is the structure of weather data from openweathermap.org
type WeatherData struct {
	CityID        int           `json:"id"`
	Name          string        `json:"name"`
	Timezone      int           `json:"timezone"`
	Sys           sysData       `json:"sys"` // nested struct
	PercentClouds percentClouds `json:"clouds"`
	Dt            int           `json:"dt"` // unix time of last reading
	WeatherMain   weatherMain   `json:"main"`
	Wind          windData      `json:"wind"`
	Coord         coordinates   `json:"coord"`
	Descriptors   []descriptors `json:"weather"` // array
}

type descriptors struct {
	ID          int    `json:"id"`
	Main        string `json:"main"`
	Description string `json:"description"`
	// Icon string `json: icon`
}

type weatherMain struct {
	// Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
	// main.temp Temperature.
	Temp float32 `json:"temp"`
	// main.feels_like Temperature. This temperature parameter accounts for the human perception of weather.
	FeelsLike float32 `json:"feels_like"`
	// main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
	Pressure float32 `json:"pressure"`
	// main.humidity Humidity, %
	Humidity uint8 `json:"humidity"`
	// main.temp_min Minimum temperature at the moment.
	TempMIN float32 `json:"temp_min"`
	// main.temp_max Maximum temperature at the moment.
	TempMAX float32 `json:"temp_max"`
}

type percentClouds struct {
	// percent cloudiness
	All int `json:"all"`
}

type sysData struct {
	Country string `json:"country"`
	Sunrise int    `json:"sunrise"`
	Sunset  int    `json:"sunset"`
}

type windData struct {
	Direction int     `json:"deg"`
	Speed     float32 `json:"speed"`
}

type coordinates struct {
	Lat float32 `json:"lat"`
	Lon float32 `json:"lon"`
}

func main() {

	BaseURL := "https://api.openweathermap.org/data/2.5/"
	Units := "imperial"
	APIKey := "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

	// limit of 20 locations in this slice
	locationSlice := []string{
		"5879400", // Anchorage, AK
		"4907985", // Rockton, IL
		"4043416", // Mangilao, Guam
		"1269843", // Hyderabad, India
		"4259418", // Indianapolis, IN
	}

	WG := ""
	if len(locationSlice) > 1 {
		WG = "group?"
	} else {
		WG = "weather?"
	}

	// validations
	if len(APIKey) != 32 {
		fmt.Println("Invalid API Key length :", APIKey)
	}

	switch strings.ToLower(Units) {
	case "imperial":
		break
	case "metric":
		break
	case "kelvin":
		break
	default:
		fmt.Println("You have an incorrect measurement unit :", Units)
	}

	locationIDs := strings.Join(locationSlice[:], ",")
	if locationIDs == "" {
		fmt.Println("locationIDs is an empty slice")
	}

	// The limit of locations is 20 in a group query
	const locLimit = 20
	i := len(locationSlice)
	if i > locLimit {
		fmt.Printf("Location limit is %d", locLimit)
	}

	var units = ("&units=" + Units)
	var apiKey = ("&appid=" + APIKey)
	var owmHTTP = (BaseURL + WG + "id=" + locationIDs + units + apiKey)
	// fmt.Println(owmHTTP)

	// GET openweathermap json data
	response, err := http.Get(owmHTTP)
	if err != nil {
		fmt.Printf("The http GET request failed with ERROR: %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
	}

}
