/**
 * Create a bar chart using d3 on a given array
 */

let users = [
  { id: 1, mark: 20 },
  { id: 2, mark: 40 },
  { id: 3, mark: 50 },
  { id: 4, mark: 69 },
  { id: 5, mark: 80 }, 
  { id: 6, mark: 90 },
  { id: 7, mark: 100 }
]
// create a canvas and append svg into it
let canvas = d3.select("body")
               .append('svg')
               .attr('width', 600)
               .attr('height', 800)
               .append('g')
               .attr('transform', 'translate(20, 10)')

// scale as linear with each other
let scale = d3.scaleLinear()
              .domain([0, 100])
              .range([0, 500])
  
// will create an axis based on the domain of scale 
let axis = d3.axisBottom().scale(scale)

// scale as linear on color with each other
let scaleColor = d3.scaleLinear()
                   .domain([0, 60])
                   .range(["red", "green"])

// rendering the bar chart
let bars = canvas.selectAll("rect")
              .data(users.map(user => user.mark))
              .enter()
              .append('rect') // appending rectangle
              .transition()
              .duration(2000)
              .attr("width", function(d) {return scale(d)}) // taking the width(each of them) and passing it to scale function
              .attr('height', 20)
              .attr('fill', function(r) { return scaleColor(r) }) // taking the color(each of them) and passing it to scaleColor function
              .attr('y', function(d, i) { return i * 50}) // gap between each bar


canvas.append('g')
      .attr('transform', 'translate(0, 350)') // putting the g to bottom(y-axis)
      .call(axis)