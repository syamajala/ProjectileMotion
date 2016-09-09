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
        target: "CND",
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

var lineFunction = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

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

var msg_paths = svg.selectAll("link")
    .data(data.links)
    .enter()
    .append("path")
    .attr("id", function(l) {
        return l.source+"_"+l.target
    })
    .attr("d", function(l) {
        var lineData = []

        var sourceNode = data.nodes.filter(function(d, i) {
            return d.name == l.source
        })[0];
        lineData.push({ "x": sourceNode.x, "y": sourceNode.y });

        var targetNode = data.nodes.filter(function(d, i) {
            return d.name == l.target
        })[0];
        lineData.push({ "x": targetNode.x, "y": targetNode.y });
        return lineFunction(lineData);
    })

var reverse_msg_paths = svg.selectAll("link")
    .data(data.links)
    .enter()
    .append("path")
    .attr("id", function(l) {
        return l.target+"_"+l.source
    })
    .attr("d", function(l) {
        var lineData = []

        var sourceNode = data.nodes.filter(function(d, i) {
            return d.name == l.target
        })[0];
        lineData.push({ "x": sourceNode.x, "y": sourceNode.y });

        var targetNode = data.nodes.filter(function(d, i) {
            return d.name == l.source
        })[0];
        lineData.push({ "x": targetNode.x, "y": targetNode.y });
        return lineFunction(lineData);
    })

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

    var startMsgs = svg.selectAll("msg")
        .data(msgData)
        .enter()
        .append("text")
        .attr("class", "msg")
        .append("textPath")
        .attr("xlink:href", function(mData) {
            return '#'.concat(mData.from, '_', mData.to);
        })
        .style("text-anchor", "middle")
        .text(function(d) { return d.name });

    for (i = 0; i < msgData.length; i++)
    {
        var msg = msgData[i];
        var startPathId = '#'.concat(msg.from, '_', msg.to);
        var endPathId = '#'.concat(msg.to, '_', msg.from);
        var startPath = svg.select(startPathId);
        var endPath = svg.select(endPathId);
        startPath
            .transition().duration(2000)
            .attr("d", endPath.attr("d"));
    }

    d3.selectAll('.msg').transition().delay(2000).remove();
}
