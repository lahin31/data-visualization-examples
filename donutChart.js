let width = 800;
let height = 600;
// scaling color
let colors = d3.scaleOrdinal(d3.schemeDark2);
// root svg container
let svg = d3.select("body")
            .append("svg")
            .attr('width', width)
            .attr('height', height)
            .style("background", "pink")

let all_languages = [
  { grade: "C", number: 8 },
  { grade: "C++", number: 21 },
  { grade: "JavaScript", number: 15 },
  { grade: "Python", number: 29 },
  { grade: "Java", number: 11 },
  { grade: "Ruby", number: 55 }
];
// using pie() generate function
let data = d3.pie()
            .value(function(d) {
              return d.number
            })(all_languages)
// arc segments
let segments = d3.arc()
                  .innerRadius(150)
                  .outerRadius(200)
                  .padAngle(0.05)
                  .padRadius(50);
// appending g to our svg container
let sections = svg
                .append("g")
                .attr("transform", "translate(250, 300)")
                .selectAll("path")
                .data(data)

// making path coloful
sections
  .enter()
  .append("path")
  .attr("d", segments)
  .attr("fill", function(d) {
    return colors(d.data.number)
  })
// making a text node, inside each of the node we are showing the number
let content = d3.select("g").selectAll("text").data(data)

content.enter().append("text").classed("inside", true).each(function(d) {
  let center = segments.centroid(d)
  d3.select(this).attr("x", center[0]).attr("y", center[1])
                .attr('text-anchor', 'middle')
                .text(d.data.number)
                .attr("fill", "#fff")
                .attr("font-weight", "bold")
})

// appending g to svg container
let langs = svg.append("g")
                .attr("transform", "translate(500, 100)")
                .selectAll(".langs")
                .data(data)

let lang = langs
      .enter()
      .append("g")
      .classed("langs", true) // we are grabing the g attribute it their class is lang
      .attr("transform", function(d, i) {
        return "translate(0, " + (i+1)*30 + ")"
      })

lang.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function(d) {
        return colors(d.data.number)
      })

lang.append("text")
    .classed("label", true)
    .text(function(d) {
      return d.data.grade
    })
    .attr("fill", function(d) {
      return colors(d.data.number)
    })
    .attr("x", 30)
    .attr("y", 20)