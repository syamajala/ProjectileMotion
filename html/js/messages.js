var data = {
    nodes: [{
        name: "WCS",
        x: 200,
        y: 150
    }, {
        name: "CND",
        x: 500,
        y: 225
    }, {
        name: "SPY",
        x: 500,
        y: 75
    }],

    links: [{
        source: "WCS",
        target: "CND"
    }, {
        source: "CND",
        target: "SPY"
    }, {
        source: "WCS",
        target: "SPY"
    }]
};

var c10 = d3.scaleOrdinal(d3.schemeCategory10)
var svg = d3.select("#messages")
    .append("svg");

var links = svg.selectAll("link")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", function(l) {
        var sourceNode = data.nodes.filter(function(d, i) {
            return d.name == l.source
        })[0];
        d3.select(this).attr("y1", sourceNode.y);
        return sourceNode.x
    })
    .attr("x2", function(l) {
        var targetNode = data.nodes.filter(function(d, i) {
            return d.name == l.target
        })[0];
        d3.select(this).attr("y2", targetNode.y);
        return targetNode.x
    })
    .attr("fill", "none")
    .attr("stroke", "white");

var radius = 25;

var nodes = svg.selectAll("node")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", function(d) {
        return d.x
    })
    .attr("cy", function(d) {
        return d.y
    })
    .attr("r", radius)
    .attr("fill", function(d, i) {
        return c10(i);
    });

var labels = svg.selectAll("label")
    .data(data.nodes)
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x-13 })
    .attr("y", function(d) { return d.y+5 })
    .text(function(d) { return d.name });

function myFunc() {
    var msgData = [{
        name: "MT-230",
        from: "CND",
        to: "WCS",
        time: 3.0
    }, {
        name: "MT-071",
        from: "WCS",
        to: "CND",
        time: 4.0
    }];

    var msg = svg.selectAll("msg")
        .data(msgData)
        .enter()
        .append("text")
        .attr("x", function(mData) {
            var sourceNode = data.nodes.filter(function(d) {
                return d.name == mData.from
            })[0];
            d3.select(this).attr("y", sourceNode.y);
            return sourceNode.x
        })
        .text(function(d) { return d.name });

}
