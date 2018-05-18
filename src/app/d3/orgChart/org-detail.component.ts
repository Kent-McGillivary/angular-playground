import { OrgItem } from './org-item';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild,  AfterViewInit, ElementRef }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';






import * as d3 from 'd3';


import * as d3Hierarchy from "d3-hierarchy";

import { TreeLayout, HierarchyNode } from 'd3';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


interface HierarchyDatum {
  name: string;
  
  children?: Array<HierarchyDatum>;
}


@Component({
  selector: 'org-detail',
  templateUrl: './org-detail.component.html',
  styleUrls: [ './org-detail.component.css' ]
})
export class OrgDetailComponent implements OnInit, AfterViewInit {

  messageShow = false;
  showTimer:Observable<number>;
  showTimerSubscription:Subscription;
  loading = false;
  savingMsg = 'Saving Hero';
  
  private d3Canvas: ElementRef;
  
 
  
   @ViewChild('canva') set content(content: ElementRef) {
      this.d3Canvas = content;
      if(this.d3Canvas) {
        this.createDiagram();
      }
     
   }


 
  height = 650;
  width = 850;

  svg:any;
  root:any;

  treeMap: TreeLayout<{}>;
  duration =750;
  i =0;

  treeData:HierarchyDatum =
  {
    name: "Top Level",
    children: [
      { 
        name: "Level 2: A",
        children: [
          { name: "Son of A" },
          { name: "Daughter of A" }
        ]
      },
      { name: "Level 2: B" }
    ]
  };

  constructor(

    private route: ActivatedRoute,
    private location: Location
  ) {
    


   // this.treeMap = d3.tree().size([400,200]);

    //this.root = <any>d3.hierarchy(this.treeData,(d:any)=>{ return d.children; }); //d3.hierarchy(this.treeData,);
    //this.root.x0 = this.height / 2;
    //this.root.y0 = 0;
    
    // Collapse after the second level
    //this.root.children.forEach((x:any)=>{this.collapse(x)});

  }

  collapse(d:any):void {
    if(d.children) {
      d._children = d.children;
      d._children.forEach((x:any)=>{this.collapse(x);});
      d.children = null;
    }
  }



  ngAfterViewInit():void {
    
  }
  ngOnInit(): void {

    

   

  }

  translate(x:number,y:number) {
    return  "translate("
    + x + "," + y + ")";
  }

  createDiagram():void {

    let data ={nodes:[{id:1, text:'M1', level:0,position:0},
    {id:2,text:'F1',level:1,position:0},
    {id:3, text:'F2',level:1,position:1}],links:[
      {source:1,target:2},{source:1,target:3}
    ]};
    console.log("Create Diagram");
    const element = this.d3Canvas.nativeElement;
    this.svg = d3.select(element).append("svg")
    .attr("width", this.width)
    .attr("height", this.height);

    let nodes = this.svg.selectAll(".node")
    .data(data.nodes)
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", d=>{
      if(d.level === 0) {
        d.x = 100;
      } else {
        d.x = 50 + d.position *100;
      }
     
      d.y = 100 + d.level *50;
      return this.translate(d.x,d.y);})
      .attr("class", "nodes");

// add the nodes
nodes.append("circle")
    .attr("r", 5);

    nodes.append("text")
         
    .attr("x", 8)
    .attr("y", 15)
   
    .text(function(d:any) {return d.text;});
    
    let nodeMap = new Map();

    nodes.each((d,i,items)=>{nodeMap.set(i,items[i]);});

    let link =  this.svg.selectAll(".link")
    .data(data.links)
  .enter().append("line")
  .attr("x1", (d:any)=> { return 75; })
    .attr("y1", (d:any)=> { return 50; })
    .attr("x2", (d:any)=> { return 100; })
    .attr("y2",(d:any)=> {  return 100; })
    .attr("class", "link")
    .style("stroke", "grey");

    link.attr("stroke-width", function(d) { return 1; });

   /*  link
    .attr("x1", (d)=>{ return nodeMap.get(d.source).x; })
    .attr("y1", (d)=> { return nodeMap.get(d.source).y; })
    .attr("x2", (d)=> { return nodeMap.get(d.target).x; })
    .attr("y2", (d)=> { return nodeMap.get(d.target).y; }) */
    

   /*  link.each((d,i,links)=>{
      let item = links[i];
      item.attributes.x1 = nodeMap.get(d.source).x;
      item.attributes.y1 = nodeMap.get(d.source).y;
      item.attributes.y2 = nodeMap.get(d.target).x;
      item.attributes.x2 = nodeMap.get(d.target).y;
      console.log("Link item");
    });
 */
   /*  let linkItems = this.svg.selectAll(".link");
    linkItems.attr("x1", (d)=>{ return nodeMap.get(d.source).x; })
    .attr("y1", (d)=> { return nodeMap.get(d.source).y; })
    .attr("x2", (d)=> { return nodeMap.get(d.target).x; })
    .attr("y2", (d)=> { return nodeMap.get(d.target).y; }); */

   /*  this.svg
    .selectAll('line.link')
    .data(data.links)
    .enter()
    .append('line')
    .classed('link', true)
    .attr("x1", (d,i,items)=> { return 50; })
    .attr("y1", function(d) { return 50; })
    .attr("x2", function(d) { return 100; })
    .attr("y2", function(d) {  return 100; })
     .style("stroke", "grey"); */
    /* attr("x1", (d)=> { return nodeMap.get(d.source).x; })
    .attr("y1", (d)=> { return nodeMap.get(d.source).y; })
    .attr("x2", (d)=> { return nodeMap.get(d.target).x; })
    .attr("y2", (d)=> { return nodeMap.get(d.target).y; }) */
    

   /*  let lines = 
    this.svg.selectAll(".links")
    .data(data.links)
    .enter().append("line")
    .attr("class", "line")
  .attr("x1", (d)=> { return nodeMap.get(d.source).x; })
  .attr("y1", (d)=> { return nodeMap.get(d.source).y; })
  .attr("x2", (d)=> { return nodeMap.get(d.target).x; })
  .attr("y2", (d)=> { return nodeMap.get(d.target).y; })
   .style("stroke", "grey");  */
  
  

   /*  this.svg.selectAll("g").data(data).append("g")

    .attr("transform", "translate("
  + 120 + "," + 29 + ")")
    .attr("class", "nodes"); */
  
  
  //.selectAll("circle")
  //.attr("r", 5)
 // .attr("fill", function(d) { return 'red'; });

  /* let nodes = this.svg.append("g")
  .data(data).enter()
    .attr("transform", "translate("
          + 120 + "," + 29 + ")"); */

  /*   nodes.append("rect")
          .attr("width", 30)
          .attr("height", 20)
          .attr("fill","red");

          nodes.append("text")
         
          .attr("x", 8)
          .attr("y", 15)
         
          .text(function(d:any) {return d.text;}); */
         


       /*    let treeLayout = d3.tree()
          .size([600,300]);


    let root = d3.hierarchy(this.treeData,(d:any)=>{ return d.children; });

      treeLayout(root);
      this.svg
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', function(d:any) {return d.source.x;})
      .attr('y1', function(d:any) {return d.source.y;})
      .attr('x2', function(d:any) {return d.target.x;})
      .attr('y2', function(d:any) {return d.target.y;});
// Nodes
//d3.select('svg g.nodes')
let rectNodes = this.svg
  .selectAll('circle.node')
  .data(root.descendants())
  .enter()
  .append('rect')
  .classed('node', true)
  .attr('x', function(d:any) {return d.x-50;})
  .attr('y', function(d:any) {return d.y-15;})
  .attr('width', 100)
  .attr('height', 30);

  rectNodes.append("text")
    .attr("dy", "-.35em")

    .text(function(d:any) { return 'Test'; }); */

// Links
   //d3.select('svg g.links')
     
          //this.update(this.root);
  }

 /*  update(source:any) {
    
      // Assigns the x and y position for the nodes
      var treeData = this.treeMap(this.root);
    
      // Compute the new tree layout.
      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);
    
      // Normalize for fixed-depth.
      nodes.forEach(function(d:any){ d.y = d.depth * 180});
    
      // ****************** Nodes section ***************************
    
      // Update the nodes...
      var node = this.svg.selectAll('g.node')
          .data(nodes, function(d:any) {return d.id || (d.id = ++this.i); });
    
      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d:any) {
            return "translate(" + source.x0 + "," + source.y0 + ")";
        })
        .on('click', (d:any)=>{
         
            if (d.children) {
                d._children = d.children;
                d.children = null;
              } else {
                d.children = d._children;
                d._children = null;
              }
            this.update(d);
          
        });
    
      // Add Circle for the nodes
      nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 1e-6)
          .style("fill", function(d:any) {
              return d._children ? "lightsteelblue" : "#fff";
          });
    
      // Add labels for the nodes
      nodeEnter.append('text')
          .attr("dy", ".35em")
          .attr("x", function(d:any) {
              return d.children || d._children ? -13 : 13;
          })
          .attr("text-anchor", function(d:any) {
              return d.children || d._children ? "end" : "start";
          })
          .text(function(d:any) { return d.data.name; });
    
      // UPDATE
      var nodeUpdate = nodeEnter.merge(node);
    
      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(this.duration)
        .attr("transform", function(d:any) { 
            return "translate(" + d.y + "," + d.x + ")";
         });
    
      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d:any) {
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');
    
    
      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
          .duration(this.duration)
          .attr("transform", function(d:AnalyserNode) {
              return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();
    
      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6);
    
      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);
    
      // ****************** links section ***************************
    
      // Update the links...
      var link = this.svg.selectAll('path.link')
          .data(links, function(d:any) { return d.id; });
    
      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d:any){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          });
    
      // UPDATE
      var linkUpdate = linkEnter.merge(link);
    
      // Transition back to the parent element position
      linkUpdate.transition()
          .duration(this.duration)
          .attr('d', function(d:any){ return diagonal(d, d.parent) });
    
      // Remove any exiting links
      var linkExit = link.exit().transition()
          .duration(this.duration)
          .attr('d', function(d:any) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();
    
      // Store the old positions for transition.
      nodes.forEach(function(d:any){
        d.x0 = d.x;
        d.y0 = d.y;
      });
    
      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s:any, d:any) {
    
        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
    
        return path
      }
    
      // Toggle children on click.
      function click(d:any) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        this.update(d);
      }
    } */

  goBack(): void {
    this.location.back();
  }

  hideSaveMessage():void {
    console.log("Hide message");
    this.messageShow = false;
    this.showTimerSubscription.unsubscribe();
    this.loading = false;
  }
  showSaveMessage(): void {
    console.log("Show message");
    this.loading = true;
    
    if(this.messageShow) { 
      //Deal with where show is already there need to cancel subscription
      this.showTimerSubscription.unsubscribe();
      //Then will reset timer over again
    }
    
    this.messageShow = true;
    this.showTimer = Observable.timer(12000);
    this.showTimerSubscription = this.showTimer.subscribe(()=>{this.hideSaveMessage();});
    
    
  }

  save(): void {
    console.log("Saved information");
    this.loading = true;
    this.showTimer = Observable.timer(20000);
    this.showTimerSubscription = this.showTimer.subscribe(()=>{
      this.loading = false;
    });

  
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/