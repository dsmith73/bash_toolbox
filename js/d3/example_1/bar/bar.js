// javascript  
// lesson 3 - bar chart
d3.select('h1').style('color', '#269926').attr('class', 'heading');

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160, 255, 14, 47, 26];
var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("Height", svgHeight);

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


