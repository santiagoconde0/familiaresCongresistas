var margin = {
    top: 20,
    right: 70,
    bottom: 30,
    left: 40
  },
  width = 790,
  height = 450,
  radius = Math.min(width, height) / 2,
  iwidth = width - margin.left - margin.right,
  iheight = height - margin.top - margin.bottom;
//
// var svg = d3
//   .select("#target1")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//
// d3.csv("data/data.csv", function(data) {
//   //   console.log("Data:", data);
//   //
//     // Lista de congresistas
//     var congresistas = d3.set(data.map(d => d.Congresista)).values();
//     console.log("Congresistas: ", congresistas);
//   //
//   var nested_congresistas = d3.nest()
//     .key(function(d) {
//       return d.Congresista;
//     })
//     // .rollup(function(d) { return +d.Congresista; })
//     // .rollup(d3.median(function(d) { return +d.land_area; }))
//     .rollup(d => {
//       // return d3.mean(d, d => +d["Número de contratos"]);
//       return d3.mean(d, d => +d.Votos);
//     })
//     .sortKeys(d3.ascending)
//     .entries(data);
//
//   console.log("nested_congresistas:", nested_congresistas);
//   //   //
//     var y = d3.scaleLinear()
//     .domain(d3.extent(nested_congresistas, d => d.value))
//     .range([height - margin.bottom, margin.top]);
//   //   //
//   //   // var con = nested_congresistas.map(d => y(d.value));
//   //   // console.log("Congresistas: ", con);
//   //   //
//   //   //
//
//     const x = d3.scaleBand()
//     .domain(congresistas)
//     .range([margin.left, width - margin.right]);
//   //
//   //
//   //
//   //
//   //   // crear burbujas
//   //   // svg.selectAll("circle")
//   //   //   .data(nested_congresistas)
//   //   //   .enter()
//   //   //   .append("circle")
//   //   //   .attr("cx", d => x(d.key))
//   //   //   .attr("cy", d => y(d.value))
//   //   //   .attr("r", 20)
//   //   //   .attr("stroke", "yellow")
//   //   //   .style("border", "1px solid red")
//   //   //   .style("fill", "#000")
//   //   //   .attr('xlink:href', "")
//   //   //   .attr('width', "300")
//   //   //   .attr('height', "300")
//   //   //   .style("fill", "transparent")
//   //   //   .style("fill", "/  img/congresistas/AnaPaolaAgudelo.jpg")
//   //   //   // .style("fill", "url(img/congresistas/AnaPaolaAgudelo.jpg)")
//   //   //   .transition()
//   //   //   .duration(4000);
//   //
//   // congresistas.forEach(function(d,i){
//   //   console.log("Nombre: ", d.replace(/ /g,'').replace("*",'')    );
//   //
//   //   // svg.append('image')
//   //   //   .data(congresistas)
//   //   //   .attr('xlink:href', "img/congresistas/"+ d.replace(/ /g,'').replace("*",'') +".jpg")
//   //   //   .attr('width', "30")
//   //   //   .attr('height', "30")
//   //   //   .attr("alt","Avatar")
//   //   //   .attr("x", () => Math.random() * width)
//   //   //   .attr("y", () => Math.random() * height)
//   //   //   .style ("border-radius", "50%");
//   //   //   });
//
//
//   //
//   // svg.append("circle")
//   // .data(nested_congresistas)
//   //     .attr("id", d => d.key)
//   //     .attr("r", "30")
//   //     .attr("fill-opacity", 0.7)
//   //     .attr("fill", "red");
//   //
//   // svg.append("clipPath")
//   //   .attr("id", d => d.key)
//   //   .append("use")
//   //   .attr("xlink:href", "img/congresistas/AnaPaolaAgudelo.jpg");
//
//   var color = d3.scaleOrdinal(d3.schemeCategory20);
//
//   var bubble = d3.pack(nested_congresistas)
//               .size([20, 20])
//               .padding(1.5);
//
//   var node = svg.selectAll(".node")
//               .data(bubble(nodes).descendants())
//               .enter()
//               .filter(function(d){
//                   return  !d.key
//               })
//               .append("g")
//               .attr("class", "node")
//               .attr("transform", function(d) {
//                   return "translate(" + x(d.key) + "," + y(d.value) + ")";
//               });
//
//
// });





// Traer datos
d3.csv("data/data.csv", function(data) {
  console.log("Data:", data);


  // Nested de congresistas con votos
  var nested_congresistas = d3.nest()
    .key(function(d) {
      return d.Congresista;
    })
    .rollup(d => {
      return d3.mean(d, d => +d.Votos);
    })
    .sortKeys(d3.ascending)
    .entries(data);
  console.log("nested_congresistas:", nested_congresistas);




  dataset = {
    "children": nested_congresistas
  };

  console.log(dataset);

  var diameter = 600;
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select("#target1")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var nodes = d3.hierarchy(dataset)
    .sum(function(d) {
      return d.value;
    });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d) {
      console.log("BUG: ", !d.children);
      return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node.append("title")
    .text(function(d) {
      return d.key + ": " + d.value;
    });



console.log("property", bubble(nodes).descendants());

var xscale = d3.scaleBand()
.domain(15)
    .range([margin.left, width - margin.right]);

var yscale = d3.scaleBand()
.domain(15)
    .range([margin.bottom, width - margin.top]);


  node.append('image')
    // .data(congresistas)
    .attr('xlink:href', function(d){
      // console.log("img/congresistas/"+d.data.key.replace(/ /g,'').replace("*",'')+".jpg");
      return "img/congresistas/"+d.data.key.replace(/ /g,'').replace("*",'')+".jpg";
    })
    .attr('width', "55")
    .attr('height', "60")
    // .attr("alt", "Avatar")
    .attr("x",function(d) {
        return xscale(d.x);
      })
    .attr("y", function(d) {
        return yscale(d.y);
      })
    .style("border-radius", "50%");

    node.append("circle")
    .attr("r", function(d) {
      return d.r;
    })
    // .style("border" , "yellow")
    .style("fill", "transparent")
          .attr("stroke", "yellow")
          .style("border", "1px solid red");

node.append("text")
  .attr("dy", ".2em")
  .style("text-anchor", "middle")
  .text(function(d) {
    return d.data.key.substring(0, d.r / 3);
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "15")
  .attr("fill", "yellow");
//
// node.append("text")
//   .attr("dy", "1.3em")
//   .style("text-anchor", "middle")
//   .text(function(d) {
//     return d.data.value;
//   })
//   .attr("font-family", "Gill Sans", "Gill Sans MT")
//   .attr("font-size", function(d) {
//     return d.r / 5;
//   })
//   .attr("fill", "red");

d3.select(self.frameElement)
  .style("height", diameter + "px");


});
