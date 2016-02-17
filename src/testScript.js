var width = 1300,
    height = 1500;
var svg = d3.select('body').append('svg')
	.attr('width',width)
	.attr('height',height);
	
var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-95)
    .linkDistance(30)
    .size([width/2, height]);
function uniq_sort(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

var bus = [];
var fromNode =[];
var toNode = [];
d3.tsv("cit-Test-set.tsv", function(d) {
  return {
    FromNodeId: +d.FromNodeId,
    ToNodeId: +d.ToNodeId,
  };
}, function(error, rows) {
  for(i =0; i < rows.length; i++)
  {
  fromNode.push(rows[i].FromNodeId);
  toNode.push(rows[i].ToNodeId);
  bus.push(rows[i].FromNodeId);
  bus.push(rows[i].ToNodeId);
  }
  
  console.log(bus);
 
  
  var uniq = [...new Set(bus)];
  var nodes = [];
  for(i = 0; i < uniq.length; i++)
  {
  nodes.push({name:uniq[i]});
  }
  var links = [];
  //links.push({source:0,target:1});
  for(i=0; i<fromNode.length;i++){
  var fromIndex = fromNode[i];
  var toIndex = toNode[i];
   var searchSource = uniq.indexOf(fromIndex);
  var searchTarget = uniq.indexOf(toIndex);
 
  links.push({source:searchSource,target:searchTarget});
  }
  

    var link = svg.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });
  force.nodes(nodes)
  	.links(links)
  	.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
  force.start();
  
   var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("fill",function(d,i){return color(i);})
      .call(force.drag);
      
      node.append("title")
      	.attr("dx",12)
      	.attr("dy",".35em")
      	.text(function(d) {return d.name;});

});
console.log("we are here");