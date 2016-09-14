Graph = function() {
    var graph = {},
        nodes = [],
        links = [],
        radius = 25;

    graph.radius = function(_) {
        if (!arguments.length) return radius;
        radius = +_;
        return graph;
    };

    graph.nodes = function(_) {
        if (!arguments.length) return nodes;
        nodes = _;
        return graph;
    };

    graph.links = function(_) {
        if (!arguments.length) return links;
        links = _;
        return graph;
    };

    graph.findNode = function(nodeName) {
        return nodes.filter(function(node, i) {
            return node.name == nodeName;
        })[0];
    };

    var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

    graph.link = function() {

        function link(d) {
            var lineData = [];

            var sourceNode = graph.findNode(d.source);
            lineData.push({ "x": sourceNode.x, "y": sourceNode.y });

            var targetNode = graph.findNode(d.target);
            lineData.push({ "x": targetNode.x, "y": targetNode.y });
            return lineFunction(lineData);
        }

        return link;
    };

    return graph;
}

function sendMessage(svg, graph, msgData, multiplier) {

    var lineFunction = d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

    function buildPaths(source, target) {
        var lineData = []

        var sourceNode = graph.findNode(source);
        lineData.push({ "x": sourceNode.x, "y": sourceNode.y });

        var targetNode = graph.findNode(target);
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
            .duration(2000/multiplier)
            .attr("d", endPath.attr("d")).remove();

        endPath.transition().delay(2000/multiplier).remove();

        svg.selectAll(".msg").transition().delay(2000/multiplier).remove();
    }
}
