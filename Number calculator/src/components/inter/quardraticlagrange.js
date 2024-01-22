import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import { useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getDisplayName } from "@mui/utils";


const Parser = require('expr-eval').Parser;

class QuardLagrange extends React.Component
{
    

    constructor(props)
    {
        super(props)
        this.state = {P1:'',P2:'',P3:'',X:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    InterpolationCalcFunction(P1,P2,P3,X)
    {

        var p1 = parseFloat(P1);
        var p2 = parseFloat(P2);
        var p3 = parseFloat(P3);
        var x = parseInt(X);
        if(p1!=null && p2!=null && x!=null)
        {
            var arr=[{point:1,x:0,y:9.81},
                {point:2,x:20000,y:9.7487},
                {point:3,x:40000,y:9.6879},
                {point:4,x:60000,y:9.6879},
                {point:5,x:80000,y:9.5682}];
            var L0 = ((arr[p2-1].x-x)*(arr[p3-1].x-x))/((arr[p2-1].x-arr[p1-1].x)*(arr[p3-1].x-arr[p1-1].x));
            var L1 = ((arr[p1-1].x-x)*(arr[p3-1].x-x))/((arr[p1-1].x-arr[p2-1].x)*(arr[p3-1].x-arr[p2-1].x));
            var L2 = ((arr[p1-1].x-x)*(arr[p2-1].x-x))/((arr[p1-1].x-arr[p3-1].x)*(arr[p2-1].x-arr[p3-1].x));
            var ans = L0*arr[p1-1].y + L1*arr[p2-1].y + L2*arr[p3-1].y;
            
            render(<span className="ansZoneInter">Quardratic Result :</span>)
            return(<span className="ansZoneInter">&emsp;&emsp;F({x}) = {ans}</span>);
        }
        else{
            return <span className="ansZone">"Input Point1,Point2,and X first!!"</span>
      }
    }


    handleSubmit(event){
        const {P1,P2,P3,X} = this.state
        const xm = this.InterpolationCalcFunction(P1,P2,P3,X)
         event.preventDefault()
         console.log("Point1 = "+P1)   //console log for debugging
         console.log("Point2 = "+P2)
         console.log("X want = "+X)
         render(xm) //same here at line 53 i literally stuck at re-rendering
    }


    handleChange(event)
    {this.setState({
        [event.target.name] : event.target.value
        })
    }

    render(){
        var arr=[{p:1,ix:0,iy:9.81},
            {p:2,ix:20000,iy:9.7487},
            {p:3,ix:40000,iy:9.6879},
            {p:4,ix:60000,iy:9.6879},
            {p:5,ix:80000,iy:9.5682}];
        
        return(
            

          <form onSubmit={this.handleSubmit}>
            <div className="bg-font">
                <div className="logo">
                    <h1>Lagrange Quardratic</h1>
                   
                    <h1>
                        
                    </h1>
                </div>

             
          <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow
          sx={{
            backgroundColor: "rgba(78, 78, 78)",
            marginLeft: "30rem",
            //color: "rgba(0, 0, 0)",
            "& th": {
              fontSize: "1.25rem",
              color: "rgba(255, 255, 255)"
            }
          }}>
            <TableCell>Point</TableCell>
            <TableCell align="left">X</TableCell>
            <TableCell align="left">Y</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
        sx={{
          backgroundColor: "white",
          marginLeft: "30rem",
          "& th": {
            fontSize: "1.25rem",
     
          }
        }}>
          {arr.map((arr) => (
            <TableRow
              key={arr.p}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {arr.p}
              </TableCell>
              <TableCell align="left">{arr.ix}</TableCell>
              <TableCell align="left">{arr.iy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
                
              <label className="text" htmlFor='P1'>&emsp;Point1 :&emsp;</label>
              <input className="input"
                name='P1'
                placeholder='input point1'
                value = {this.state.P1}
                onChange={this.handleChange}
                size='8'
              />
              <label className="text" htmlFor='P2'>&emsp;Point2 :&emsp;</label>
              <input className="input"
                name='P2'
                placeholder='input point2'
                value={this.state.P2}
                onChange={this.handleChange}
                size='8'
              />
              <label className="text" htmlFor='P3'>&emsp;Point3 :&emsp;</label>
              <input className="input"
                name='P3'
                placeholder='input point3'
                value={this.state.P3}
                onChange={this.handleChange}
                size='8'
              />
              <label className="text" htmlFor='X'>&emsp;X :&emsp;</label>
              <input className="input"
                name='X'
                placeholder='input X'
                value={this.state.X}
                onChange={this.handleChange}
                size='5'
              />
              </div>
              <p></p>
              
            <p></p>
            <div className="bg-font">
            &emsp;<button  className="botton">Calculate</button>
            </div>
          </form> 
        )
      }

    }
    
    



export default QuardLagrange