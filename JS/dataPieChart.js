        var xmlhttp= new XMLHttpRequest();
        var url="../JSON/dataVisualCrime.json";
        xmlhttp.onreadystatechange=function()
        {
 	      if(this.readyState==4 && this.status==200)
	       {
		     var myArr=JSON.parse(this.responseText);
		     myFunction(myArr);
	       }
        };
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
        function myFunction(arr)
        {
	      var i;
	      var count=0;
	      var count1=0;
	      var count2=0;
	      var count3=0;
	        for(i=0;i<arr.length;i++)
	          {
			        if(arr[i].FBI=="2" || arr[i].FBI=="3" || arr[i].FBI=="4A" || arr[i].FBI=="4B" || arr[i].FBI=="5" || arr[i].FBI=="6" || arr[i].FBI=="7" || arr[i].FBI=="9" )
		            {
			          count++;
		            }
	 		        if(arr[i].FBI=="8A" || arr[i].FBI=="8B" || arr[i].FBI=="10" || arr[i].FBI=="11" || arr[i].FBI=="12" || arr[i].FBI=="13" || arr[i].FBI=="14" || arr[i].FBI=="15" || arr[i].FBI=="16" || arr[i].FBI=="17" || arr[i].FBI=="18" || arr[i].FBI=="19" || arr[i].FBI=="20" || arr[i].FBI=="22" || arr[i].FBI=="24" || arr[i].FBI=="26" )
		            {
			          count1++;
			 		      }
 		          if(arr[i].FBI=="2" || arr[i].FBI=="3" || arr[i].FBI=="4A" || arr[i].FBI=="4B" )
 		            {
 			          count2++;
 		            }
 		          if(arr[i].FBI=="5" || arr[i].FBI=="6" || arr[i].FBI=="7" || arr[i].FBI=="9" )
 		            {
			          count3++;
		            }
	          }
        var data=[count,count1,count2,count3];
        var width=700;
        var height=600;
        var radius=200;
        var legendRectSize = 18;                                  
        var legendSpacing = 4; 
        var labelHeader = { }
        var labelHeader=["Index Crimes","Non Index Crimes","Violent Crime","Property Crimes"];
        var pie=d3.layout.pie();
        var stencil=pie(data);

        var svg=d3.select("html")
                  .append("svg")
                  .attr("width",width)
                  .attr("height",height);

        var container=svg.append("g")
                         .attr("transform","translate ("+width/2+","+height/2+")");

        var g=container.selectAll("g")
                       .data(stencil)
                       .enter()
                       .append("g");

        var arc=d3.svg.arc()
                  .outerRadius(radius)
                  .innerRadius(radius/2);
        
        var color=d3.scale.category20();

        g.append("path")
         .attr("d",arc)
         .style("fill",function(d,i)
         {
	        return color(d.value);
         });
        g.append("text")
        .attr("transform",function(d) {return "translate("+arc.centroid(d)+")" ; })
        .text(function(d) { return d.data; });
        
        sampleOrdinal = d3.scale.category20().domain(labelHeader);
        verticalLegend = d3.svg.legend().labelFormat("none").cellPadding(10).orientation("vertical").units("Crime Category").cellWidth(25).cellHeight(18).inputScale(sampleOrdinal).cellStepping(10);
        d3.select("svg").append("g").attr("transform", "translate(50,140)").attr("class", "legend").call(verticalLegend).attr("transform","translate(550,80)");
        }