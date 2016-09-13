var data = {
    nodes: [{
        name: "WCS",
        x: 195,
        y: 170
    }, {
        name: "CND",
        x: 450,
        y: 270
    }, {
        name: "SPY",
        x: 450,
        y: 70
    }],

    links: [{
        source: "WCS",
        target: "CND",
    }, {
        source: "CND",
        target: "SPY"
    }, {
        source: "WCS",
        target: "SPY"
    }]
};

var svg  = d3.select("#messages").append("svg")

var graph = Graph()

graph
    .nodes(data.nodes)
    .links(data.links);

var path = graph.link();

var link = svg.selectAll(".link")
    .data(data.links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "white");

var c10 = d3.scaleOrdinal(d3.schemeCategory10)

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", graph.radius())
    .attr("fill", function(d, i) { return c10(i); });

var labels = svg.selectAll(".label")
    .data(data.nodes)
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x-13; })
    .attr("y", function(d) { return d.y+5; })
    .text(function(d) { return d.name; });

// var msgData = [{
//     id: 0,
//     name: "MT-230",
//     from: "WCS",
//     to: "CND",
//     time: 3.0
// },  {
//     id: 1,
//     name: "Bye",
//     from: "N_A",
//     to: "N_B",
//     time: 4.0
// }
// ];
