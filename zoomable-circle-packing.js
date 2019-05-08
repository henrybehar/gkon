// URL: https://observablehq.com/@d3/zoomable-circle-packing
// Title: Zoomable Circle Packing
// Author: D3 (@d3)
// Version: 156
// Runtime version: 1

import {
  circles
}
from "./circles.js"
const m0 = {
  id: "5831f55fccfa1c41@156",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`PROTOTYPE_1` 
  // controls what's at the top/title
)})
    },
    {
      name: "chart",
      inputs: ["pack","data","d3","DOM","width","height","color"],
      value: (function(pack,data,d3,DOM,width,height,color)
{
  const root = pack(data);
  let focus = root;
  let view;


  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("width", "calc(100% + 28px)")
      .style("height", "auto")
      .style("background", color("black"))
      .style("cursor", "pointer")
      .on("click", () => zoom(root));

  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "black")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "hsl(0, 100%, 37%"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

  const label = svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("display", d => d.parent === root ? "none" : "none")
      .style("font", d => d.parent === root ? "30px futura": "12px sans-serif")
      .style("fill", d => d.parent === root ? "hsl(0, 100%, 65%)" : "hsl(0, 100%, 65%)")// this controls title color (root) and the interior font colors
      .text(d => d.data.name);

  zoomTo([root.x, root.y, root.r * 5]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(d3.event.altKey ? 7500 : 600) // controls zoom speed
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2.7]); // how close of a zoom
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  return svg.node();
}
)
    },
    {
      name: "data",
      inputs: ["d3"],
      value: circles
    },
    {
      name: "pack",
      inputs: ["d3","width","height"],
      value: (function(d3,width,height){return(
data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
)})
    },
    {
      name: "width",
      value: (function(){return(
932
)})
    },
    {
      name: "height",
      inputs: ["width"],
      value: (function(width){return(
width
)})
    },
    {
      name: "format",
      inputs: ["d3"],
      value: (function(d3){return(
d3.format(",d")
)})
    },
    {
      name: "color",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleLinear()
    .domain([0, 0])
    .range(["hsl(0,100%,100%)", "hsl(0,100%,100%)"])
    .interpolate(d3.interpolateHcl)
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "5831f55fccfa1c41@156",
  modules: [m0]
};

export default notebook;
