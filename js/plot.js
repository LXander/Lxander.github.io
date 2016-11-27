/**
 * Created by xander on 26/11/2016.
 */

function zip_data(xData,yData)
{
    var data =[];
    for (i = 0;i<xData.length;i++){
        data.push([xData[i],yData[i]]);

    }
    return data;

}




function plot_roc(data){
    //size of svg
    var width = 600,
        height = 250,
        margin = {left:50,top:30,right:50,bottom:30},
        g_width = width-margin.left-margin.right,
        g_height = height-margin.top-margin.bottom;

    // create svg
    var svg = d3.select("plot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // create Scale
    var xScale = d3.scaleLinear()
        .domain([0,1])
        .range([margin.left,g_width+margin.left]);

    var yScale = d3.scaleLinear()
        .domain([0,1])
        .range([g_height+margin.top,margin.top]);

    // create axis and grid
    var xAxis = d3.axisBottom()
        .tickSizeInner(-g_height)
        .tickSizeOuter(0)
        .tickPadding(10)
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .tickSizeInner(-g_width)
        .tickSizeOuter(0)
        .tickPadding(10)
        .scale(yScale);

    // line for curve
    var line_generator = d3.line()
        .curve(d3.curveCatmullRomOpen)
        .x(function(d,i){ return xScale(d.fpr); })
        .y(function(d,i){ return yScale(d.tpr)});

    // area under curve
    var area = d3.area()
        .x(function(d){
            return xScale(d.fpr);
        })
        .y0(height-margin.bottom)
        .y1(function(d){
            return yScale(d.tpr)
        })
        .curve(d3.curveCatmullRomOpen);

    // draw area
    svg.append("path")
        .attr("class","area")
        .attr("d",area(data));

    // draw line
    svg.append("path")
        .attr('class','line')
        .attr("d",line_generator(data));

    // draw axis
    svg.append('g')
        .attr('class','axis')
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .call(xAxis);

    svg.append('g')
        .attr('class','axis')
        .attr("transform",`translate(${margin.left},0)`)
        .call(yAxis);


}

