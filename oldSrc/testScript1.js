
var nodes = null,
    links = null;
var skipAnimation = false;
   
var width = 640*2,
    height = 480*2;
var node = [];
var link = [];

var animationStep = 750;


var force = null;


var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

var initForce = function() {

    svg.selectAll('*').remove();

 d3.tsv("cit-Test-set.tsv", function(d) {
  return {
    FromNodeId: +d.FromNodeId,
    ToNodeId: +d.ToNodeId,
  };
    }, function(error, rows) {
    var bus = [];
    var fromNode =[];
    var toNode = [];

    var animating = false;
  for(i =0; i < rows.length; i++)
  {
  fromNode.push(rows[i].FromNodeId);
  toNode.push(rows[i].ToNodeId);
  bus.push(rows[i].FromNodeId);
  bus.push(rows[i].ToNodeId);
  }
  
  var uniq = [...new Set(bus)];
  var nodes = [];
  for(i = 0; i < uniq.length; i++)
  {
  nodes.push({name:uniq[i], weight:0});
  }
  var links = [];

  for(i=0; i<fromNode.length;i++){
  var searchSource = uniq.indexOf(fromNode[i]);
  var searchTarget = uniq.indexOf(toNode[i]);
  nodes[searchSource].weight++;
  nodes[searchTarget].weight++;
 links.push({source:uniq.indexOf(fromNode[i]),
  target:uniq.indexOf(toNode[i])});
  }
  
  //console.log(nodes);
    force = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links);
    

        force.linkDistance(35);
        force.charge(-50);

    //arrow code, credit to http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/
  svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
    .style("stroke", "#4679BD")
    .style("opacity", "0.6");

        link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("marker-end","url(#suit)")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var color = d3.scale.category20();
        node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr("r", function(d){
            if(Math.sqrt(d.weight)<3.5)
            {
                return 3.5;
            }
            else
            {
                return Math.sqrt(d.weight);
            }
        })
        .attr("fill",function(d,i){return color(i);})
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .call(force.drag);

        node.append("title")
        .attr("dx",12)
        .attr("dy",".35em")
        .text(function(d) {
            var toReturn = d.name+"\n"+"Node's neighbors: "+ d.weight;
            return toReturn;
            });

        // Finally we tell D3 that we want it to call the step
        // function at each iteration.
        if(skipAnimation==false)
        { console.log("we are here");
            force.on('tick', stepForce);}
        else
        {
            force.on('end', function() {
                node.attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; });
                link.attr('x1', function(d) { return d.source.x; })
                .attr('y1', function(d) { return d.source.y; })
                .attr('x2', function(d) { return d.target.x; })
                .attr('y2', function(d) { return d.target.y; });
            });
        }

       
        //d3.selectAll('button').attr('disabled', false);
    }
    );
}


var stepForce = function() {


    if (force.fullSpeed) {

        node.attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });



    } else {

        node.transition().ease('linear').duration(animationStep)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
    }

    if (force.fullSpeed) {

        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

    } else {

        link.transition().ease('linear').duration(animationStep)
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });
    }



    if (!force.fullSpeed) {
        force.stop();
    }


    if (force.slowMotion) {
        setTimeout(
            function() { force.start(); },
            animationStep
        );
    }

}


d3.select('#advance').on('click', function() {
    console.log(skipAnimation);
    force.start();

});



d3.select('#slow').on('click', function() {
    console.log(skipAnimation);
    force.slowMotion = true;
    force.fullSpeed  = false;

    force.start();

});

d3.select('#play').on('click', function() {
    console.log(skipAnimation);

    force.slowMotion = false;
    force.fullSpeed  = true;


    force.start();

});
d3.select('#noAnimation').on('click', function(){
    skipAnimation=true;
    initForce();
    
});
d3.select('#restart').on('click', function(){
    skipAnimation=false;
    force.on('tick', stepForce);
})

d3.select('#stop').on('click', function(){
    force.stop();
});
d3.select('#pinNodes').on('click', function(){
     //code credit to coppelia.io
        var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);
    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }
    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy;
    }
    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        force.resume();
    }
    function releasenode(d) {
        d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        //force.resume();
    }
        node.on('dblclick',releasenode)
        .call(node_drag); //new add
      //end of coppelia.io pin code
});
d3.select('#disablePinNodes').on('click', function(){


});


d3.select('#reset').on('click', function() {

    if (force) {
        force.stop();
    }


    initForce();

});
/*d3.select('#increaseLinkDistance').on('click',function(){
    console.log(force);
});*/
initForce();