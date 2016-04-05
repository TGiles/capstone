
//Stable build March 4th 2016
//Modified build March 7 2016
var nodes = null,
links = null;
var skipAnimation = false;   
//var width = 400,
//    height = 850;
var node = [];
var link = [];
var animationStep = 750;
var force = null;
var dictionary ={};
var chargeNum;

var initData = function() {

    dictionary = {};

    d3.tsv("Output1-3-2.tsv", function(d)
    {
        return {
            Paper: d.Paper,
        };

    }, function(error, rows)
    {
         //console.log(rows[0].Paper);

         for(i = 0; i < rows.length; i++)
         {
            dictionary[rows[i].Paper] = {Paper:rows[i].Paper,weight:0};
        }
        initForce();
    });

}

//var height = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//var width = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
console.log(this);
var svg = d3.select("#graphArea").append('svg:svg')
.attr('width', "100%")
.attr('height', 1200)
    //.append("svg:g")
   // .attr("transform","translate("+1000/4+","+"100%"/3+")");
    //.attr('viewBox', 25, 25, height, width);
    svg.append("svg:rect")
    .attr("width","100%")
    .attr("height",1200)
    .style("stroke","#000");
    var initForce = function() {
   // console.log(dictionary["9200010"]);
   svg.selectAll('*').remove();

   d3.tsv("Cit-test-set.tsv", function(d) {
      return {
        FromNodeId: d.FromNodeId, //reversed line 58 and 59 !!!
        ToNodeId: d.ToNodeId,
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
 // console.log(uniq);
 var nodes = [];
 for(i = 0; i < uniq.length; i++)
 {
    //name:uniq[i]
    var a=uniq[i];
  // console.log(a);
   //console.log(typeof(a));
   //console.log(typeof(dictionary[a]));
   nodes.push(dictionary[a]);

}
console.log(nodes.length);
var links = [];
  //console.log(nodes);
 // console.log(fromNode);
  //console.log(toNode);
  for(i=0; i<fromNode.length;i++){
    //for(key in obj)
    //{
    // do something
    //}
    var searchSource = uniq.indexOf(fromNode[i]);
    var searchTarget = uniq.indexOf(toNode[i]);
  //console.log(searchSource);
  //console.log(nodes[searchSource]);
  //nodes[searchSource].weight++;
  //console.log(searchTarget);
  //console.log(nodes[searchTarget]);
  nodes[searchTarget].weight++;
  links.push({source:searchSource,
      target:searchTarget});
}

  //console.log(nodes);
  chargeNum = -nodes.length;
  force = d3.layout.force()
  .size([this.outerHeight, this.outerWidth])
  .nodes(nodes)
  .gravity(1)
  .links(links);
  console.log(svg);

  force.linkDistance(35);
  force.charge(chargeNum);

    //arrow code, credit to http://www.coppelia.io/2014/07/an-a-to-z-of-extra-features-for-the-d3-force-layout/
    svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"]) // .data(["suit", "licensing", "resolved"])
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
    .style("opacity", "0.9");

    link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link')
    .attr("x1", function(d) { return d.source.x; }) //swapped target and source
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
        if(Math.sqrt(d.weight)<5)
        {
            return 5;
        }
        else
        {
            return Math.sqrt(d.weight);
        }
    })
    .attr("fill",function(d,i){return color(i);})
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .on('click', function(d){
        console.log(d);
        var xmlhttp;
        var thePaper;
        if(d===null)
        {
            return;
        }
        else
        {
            if(window.XMLHttpRequest)
            {
                xmlhttp = new XMLHttpRequest();
            }
            else
            {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xmlhttp.onreadystatechange = function(){
                if(xmlhttp.readyState ==4 && xmlhttp.status==200)
                {
                        someResults = JSON.parse(xmlhttp.responseText);
                        if(someResults[5]=="\n"||someResults[5]=="\r\n"||someResults[5]=="\r")
                        {
                            someResults[5]="No Journal";
                            //console.log("we did it");
                        }
                        //console.log(someResults);
                        d.title=someResults[0];
                        str = "<b>" +"PaperID: "+"</b>"+someResults[0] + "<br>"
                        + "<b>" + "From: "+"</b>" + someResults[1] +"<br>" +
                        "<b>" + "Date: "+ "</b>" + someResults[2] +"<br>" +
                        "<b>" + "Title: "+"</b>" + someResults[3] +"<br>" +
                        "<b>" + "Authors: "+"</b>" + someResults[4] +"<br>" +
                        "<b>" + "Journal: "+"</b>" + someResults[5] + "<br>" +
                        "<b>" + "Abstract: "+"</b>" + someResults[6] + "<br>";
                        document.getElementById("absInfo").innerHTML=str;

                    }
                };
                xmlhttp.open("GET","getEssentialData.php?q="+d.Paper, true);
                xmlhttp.send();
                //console.log("request sent "+d.Paper);
            }
            //toReturn = "Paper ID: "+ thePaper +"\n"+"Node's neighbors: "+ d.weight;
            // return toReturn;
            

        })
    .call(force.drag);
        console.log(node);

        node.append("title")
        .attr("dx",12)
        .attr("dy",".35em")
        .text(function(d) {
            //console.log(d);
            var xmlhttp;
            var thePaper;
            if(d===null)
            {
                return "NULLERINO";
            }
            else
            {
                if(window.XMLHttpRequest)
                {
                    xmlhttp = new XMLHttpRequest();
                }
                else
                {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.onreadystatechange = function(){
                    if(xmlhttp.readyState ==4 && xmlhttp.status==200)
                    {
                        //console.log(d);
                        //console.log("request returned "+d.Paper);
                        //console.log(xmlhttp.responseText);

                        thePaper = JSON.parse(xmlhttp.responseText);
                        

                    }
                };
                xmlhttp.open("GET","getEssentialData.php?q="+d.Paper, true);
                xmlhttp.send();
                //console.log("request sent "+d.Paper);
                return "Weight of Node: "+d.weight+"\n"+"Paper ID: "+d.Paper;
            }
        });
       
        console.log(node[0]);
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
d3.select('#chargeIncrease').on('click', function(){

chargeNum = chargeNum + 15;
force.charge(chargeNum);
console.log("charge increased "+chargeNum);
force.start();
});
d3.select('#chargeDecrease').on('click', function(){

chargeNum = chargeNum - 15;
force.charge(chargeNum);
force.start();
});

d3.select('#reset').on('click', function() {

    if (force) {
        force.stop();
    }
    svg.selectAll('*').remove();

    initData();

});
/*d3.select('#increaseLinkDistance').on('click',function(){
    console.log(force);
});*/
initData();