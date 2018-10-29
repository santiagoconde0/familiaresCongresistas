
d3.csv("data/test.csv", function(data) {
  console.log("Data:", data);


var width = 400, height = 400

var numNodes = 100
var nodes = data;


console.log( nodes);
var simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-5))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('collision', d3.forceCollide().radius(47))
  .on('tick', ticked);

function ticked() {
  var u = d3.select('svg')
    .selectAll('image')
    .data(nodes).attr('xlink:href', function(d){
      return "img/congresistas/"+d.ID.replace(/ /g,'').replace("*",'')+".png";
    })

  u.enter()
    .append('image')
    .merge(u)
    .attr("width", 100)
    .attr("height", 100)
    .attr("x", function(d) {
      return d.x
    })
    .attr("y", function(d) {
      return d.y
    })
    ;

  u.exit().remove()
}

});
