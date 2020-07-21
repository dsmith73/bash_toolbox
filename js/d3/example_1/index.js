// javascript  
d3.select();
d3.selectAll();

d3.select('h1').style('color', 'red')
.attr('class', 'heading')

.text('Lesson 1 - working with the text');    // change the text in the selected h1  

d3.select('lesson_1').append('p').text('First Paragraph of text from index.js');    // select element by 'Name'  
d3.select('lesson_1').append('p').text('Second Paragraph of text from index.js');
d3.select("#first").append('p').text('Third Paragraph of text from index.js');  // d3.js select element by "ID"
document.getElementById('first').append('fourth Paragraph of text from index.js');  // js select by ID

d3.selectAll('p').style('color', 'blue');


// lesson 2  
var dataset = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

d3.select('lesson_1')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')    // appends a paragraph for each data element  
    // .text('D3 is interesting...');
    .text(function(d) { return d; });

d3.select('p').style('color', 'orange');


// lesson 3 - bar chart
d3.select('h2').style('color', '#269926')
.attr('class', 'heading');

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160, 255, 14, 47, 26];
var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()    // takes dataset from waiting state and performs following steps on each data item  
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - d;
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function(d, i) {
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    });


// footer 
d3.select('footer').append('div').text('dsmith73');


// creating labels for the bar chart
var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#a64c38");

// scales  
var dataset = [8, 10, 5.6, 12, 18, 3, 4, 12, 16, 25.5, 14, 47, 26];
var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select("#bChartScales")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight]);

var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()    // takes dataset from waiting state and performs following steps on each data item  
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - yScale(d)
    })
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function(d, i) {
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    });

var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#fff");


// axis  
d3.select("#L7").style('color', 'orange')
.attr('class', 'heading');

// different axis to use  
// d3.axisTop()
// d3.axisRight()
// d3.axitBottom()
// d3.axisLeft()

var data = [80, 100, 56, 120, 180, 30, 40, 120, 160, 255, 14, 47, 26];
var svgWidth = 500, svgHeight = 300;

var svg = d3.select("#bChartAxis")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);    

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom()
    .scale(xScale);
var y_axis = d3.axisLeft()
    .scale(yScale);

svg.append("g")
    .attr("transform", "translate(40, 10)")
    .call(y_axis);

var xAxisTranslate = svgHeight -20;

svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate +")")
    .call(x_axis);

var barWidth = (svgWidth / data.length);

var barChart = svg.selectAll("rect")
    .data(data)
    .enter()    // takes dataset from waiting state and performs following steps on each data item  
    .append("rect")
    .attr("y", function(d) {
        return xAxisTranslate - d;
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function(d, i) {
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    });

var text = svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#a64c38");


// creating SVG elements with D3
d3.select("#L8").style('color', 'blue').attr('class', 'heading');

var svgWidth = 800, svgHeight = 700;

var svg = d3.select("#bChartSVGEle")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg-container");

var line = svg.append("line")
    .attr("x1", 100)
    .attr("xx", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "red")
    .attr("stroke-width", 3);

var rect = svg.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "#9b95ff");

var circle = svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 300)
    .attr("r", 80)
    .attr("fill", "#7ce8d5");



// creating Line Chart
d3.select("#L9").style('color', 'blue').attr('class', 'heading');

// api to fetch historical data of bitcoin price index  
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-03-01&end=2020-07-15';

// loading data from api when DOM content has been loaded  
document.addEventListener("DOMContentLoaded", function(event) {
fetch(api)
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
    })
    .catch(function(err) { console.log(err); })
});

/*
//  parse data into k, v pairs
//  param {object} data object containing historical data of api
*/
function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i),  // date  
            value: +data.bpi[i]     // convert str to number  
        });
    }
    return arr;
}

// create chart using D3  
// @param {object} data object of historical data of BPI  
function drawChart(data) {
var svgWidth = 1000, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#d3LineChart")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

g.append("g")   // y axis  
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

g.append("path")    // create the line  
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
