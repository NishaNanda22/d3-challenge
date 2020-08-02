// i am pretty sure i am missing defintions 

var width = parseInt(d3.select("#scatter").style("width"));

var height = width - width / 4.2;

var margin = 20;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var pointRadius;
function crGet() {
  if (width <= 300) {
    circRadius = 3;
  }
  else {
    circRadius = 5;
  }
}
crGet();


svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

function xTextRefresh() {
  xText.attr(
    "transform",
    "translate(" +
      (
// im not sure what to put in the parantheses
  );
}
xTextRefresh();

xText
  .append("text")
  .attr("y", -50)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

xText
  .append("text")
  .attr("y", 50)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");

xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");


svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

yText
  .append("text")
  .attr("y", 50)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");
    
yText
  .append("text")
  .attr("y", -50)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");

yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");


d3.csv("data.csv").then(function(data) {

  visualize(data);
});

function visualize(data) {

  var X = "poverty";
  var Y = "obesity";
  var xMin;
  var xMax;
  var yMin;
  var yMax;
    
  xMinMax();
  yMinMax();

  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([margin, height - margin]);


  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  function tickCount() {
    if (width <= 200) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();

  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin) + ", 0)");


  var theCircles = svg.selectAll("g theCircles").data(data).enter();


  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[X]);
    })
    .attr("cy", function(d) {
      return yScale(d[Y]);
    })
    