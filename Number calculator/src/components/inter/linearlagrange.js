import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import { useState } from 'react'
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getDisplayName } from "@mui/utils";


const Parser = require('expr-eval').Parser;

class LiLagrange extends React.Component
{
    

    constructor(props)
    {
        super(props)
        this.state = {yo:[],xo:[],po:[],P1:'',P2:'',X:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmitAPI = this.handleSubmitAPI.bind(this)    
    }

    InterpolationCalcFunction(P1,P2,X)
    {

        var p1 = parseFloat(P1);
        var p2 = parseFloat(P2);
        var x = parseInt(X);
        var L0;
        if(p1!=null && p2!=null && x!=null)
        {
          var arr1=[{p:this.state.po[0],ix:this.state.xo[0],iy:this.state.yo[0]},
          {p:this.state.po[1],ix:this.state.xo[1],iy:this.state.yo[1]},
          {p:this.state.po[2],ix:this.state.xo[2],iy:this.state.yo[2]},
          {p:this.state.po[3],ix:this.state.xo[3],iy:this.state.yo[3]},
          {p:this.state.po[4],ix:this.state.xo[4],iy:this.state.yo[4]}];
          console.log(arr1[0].ix)

            L0 = (arr1[p2-1].ix-x)/(arr1[p2-1].ix-arr1[p1-1].ix);
            var L1 = (arr1[p1-1].ix-x)/(arr1[p1-1].ix-arr1[p2-1].ix);
            var ans = L0*arr1[p1-1].iy + L1*arr1[p2-1].iy;

            render(<span className="ansZoneInter">Linear Result :</span>)
            return(<span className="ansZoneInter">&emsp;&emsp;F({x}) = {ans}</span>);

        }
        else{
            return <span className="ansZone">"Input Point1,Point2,and X first!!"</span>
      }
    }


    handleSubmit(event){
        const {P1,P2,X} = this.state
        const xm = this.InterpolationCalcFunction(P1,P2,X)
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

    handleSubmitAPI(event){
      event.preventDefault()
      axios.get('http://localhost:3700/Lagrange')
            .then(res => {
              const data = res.data
              console.log(data)
              this.setState({po: res.data[0].arr})
              this.setState({xo: res.data[0].x})
              this.setState({yo: res.data[0].y})
            })
    }

    render(){
        var arr=[{p:0,ix:0,iy:0},
            {p:0,ix:0,iy:0},
            {p:0,ix:0,iy:0},
            {p:0,ix:0,iy:0},
            {p:0,ix:0,iy:0}];

        arr=[{p:this.state.po[0],ix:this.state.xo[0],iy:this.state.yo[0]},
              {p:this.state.po[1],ix:this.state.xo[1],iy:this.state.yo[1]},
              {p:this.state.po[2],ix:this.state.xo[2],iy:this.state.yo[2]},
              {p:this.state.po[3],ix:this.state.xo[3],iy:this.state.yo[3]},
              {p:this.state.po[4],ix:this.state.xo[4],iy:this.state.yo[4]}];

        
        
        return(
            

          <form>
            <div className="bg-font">
                <div className="logo">
                    <h1>Lagrange Linear</h1>
                   
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
            &emsp;<button  onClick={this.handleSubmit}  className="botton">Calculate</button>
            &emsp;<button  onClick={this.handleSubmitAPI}  className="botton">API</button>
            </div>
          </form> 
        )
      }

    }
    
    



export default LiLagrange