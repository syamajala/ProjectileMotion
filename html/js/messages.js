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

function findNode(nodeName)  {
    return data.nodes.filter(function(node, i) {
        return node.name == nodeName;
    })[0];
}

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

function messageFlow() {

    var msgData = [{
        id: 0,
        name: "MT-230",
        from: "CND",
        to: "WCS",
        time: 3.0
    },//  {
    //     id: 1,
    //     name: "MT-071",
    //     from: "WCS",
    //     to: "CND",
    //     time: 4.0
    // }
                  ];

    var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

    function buildPaths(source, target) {
            var lineData = []

            var sourceNode = findNode(source);
            lineData.push({ "x": sourceNode.x, "y": sourceNode.y });

            var targetNode = findNode(target);
            lineData.push({ "x": targetNode.x, "y": targetNode.y });
            return lineFunction(lineData);
    }

    var msgPaths = svg.selectAll("link")
        .data(msgData)
        .enter()
        .append("path")
        .attr("id", function(msg) {
            return msg.from.concat("_", msg.to, msg.id.toString());
        })
        .attr("d", function(msg) {
            return buildPaths(msg.from, msg.to);
        });

    var reverseMsgPaths = svg.selectAll("link")
        .data(msgData)
        .enter()
        .append("path")
        .attr("id", function(msg) {
            return msg.to.concat("_", msg.from, msg.id.toString());
        })
        .attr("d", function(msg) {
            return buildPaths(msg.to, msg.from);
        });

    var startMsgs = svg.selectAll("msg")
        .data(msgData)
        .enter()
        .append("text")
        .attr("class", "msg")
        .append("textPath")
        .attr("xlink:href", function(msg) {
            return '#'.concat(msg.from, '_', msg.to, msg.id.toString());
        })
        .attr("startOffset", "10%")
        .text(function(d) { return d.name });

    for (i = 0; i < msgData.length; i++)
    {
        var msg = msgData[i];
        var startPathId = '#'.concat(msg.from, '_', msg.to, msg.id.toString());
        var endPathId = '#'.concat(msg.to, '_', msg.from, msg.id.toString());
        var startPath = svg.select(startPathId);
        var endPath = svg.select(endPathId);

        startPath
            .transition()
            .duration(2000)
            .attr("d", endPath.attr("d")).remove();

        endPath.transition().delay(2000).remove();

        svg.selectAll(".msg").transition().delay(2000).remove();
    }
}
