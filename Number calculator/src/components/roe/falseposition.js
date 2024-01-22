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

class Falseposition extends React.Component
{


    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    FalsePositionCalcFunction(XL,XR,ErrorApox,Funct)
    {
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }

        var i = 0;
        var xl = parseFloat(XL);
        var xr = parseFloat(XR);
        var xm,xold;
        var ErrorApox_Answer=10000000; //set as default
        var inputerrorapox = parseFloat(ErrorApox)
        var arr = [];

        if(xl!=null && xr!=null && Funct!=null && inputerrorapox!=null){
        while(ErrorApox_Answer>inputerrorapox)
            {
                xm=((xl*fx(xr))-(xr*fx(xl)))/(fx(xr)-fx(xl));
                if(fx(xm)*fx(xr)<0)
                {
                    xold=xl
                    xl=xm
                }
                if(fx(xm)*fx(xr)>0)
                {
                    xold=xr
                    xr=xm
                }
                ErrorApox_Answer = Math.abs((xm-xold)/xm)*100
            i++
            console.log("XL = "+xl)   //console log for debugging
            console.log("XM = "+xm)
            console.log("XR = "+xr)
            console.log("Errorapox = "+ErrorApox_Answer)
            arr.push({i,xm,ErrorApox_Answer})  
        }
        render(
          <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow
          sx={{
            backgroundColor: "rgba(44, 46, 49)",
            marginLeft: "30rem",
            color: "rgba(44, 46, 49)",
            "& th": {
              fontSize: "1.25rem",
              color: "rgba(255, 252, 252)"
            }
          }}>
            <TableCell>Iteration</TableCell>
            <TableCell align="left">XM</TableCell>
            <TableCell align="left">ErrorApox</TableCell>
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
              key={arr.i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {arr.i}
              </TableCell>
              <TableCell align="left">{arr.xm}</TableCell>
              <TableCell align="left">{arr.ErrorApox_Answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        )
      }
      else{
        return <span className="ansZone">"Input XL,XR,ErrorApox and Function first!!"</span>
      }
      
    }


    handleSubmit(event){
        const {XL,XR,ErrorApox,Funct} = this.state
       
        const xm = this.FalsePositionCalcFunction(XL,XR,ErrorApox,Funct)
        event.preventDefault()
        console.log("XL = "+XL)   //console log for debugging
        console.log("XR = "+XR)
        console.log("Function = "+Funct)
        console.log("Errorapox = "+ErrorApox)
        render(xm) //same here at line 53 i literally stuck at re-rendering
       

    }

    handleChange(event)
    {this.setState({
        [event.target.name] : event.target.value
        })
    }

    render(){
        return(

          <form onSubmit={this.handleSubmit}>
            <div className="bg-font">
                <div className="logo">
                    <h1>False-position Method</h1>
                    <h1>
                        
                    </h1>
                </div>
                
              <label className="text" htmlFor='XL'>&emsp;XL :&emsp;</label>
              <input className="input"
                name='XL'
                placeholder='Starting XL'
                value = {this.state.XL}
                onChange={this.handleChange}
                size='8'
              />
              <label className="text" htmlFor='XR'>&emsp;XR :&emsp;</label>
              <input className="input"
                name='XR'
                placeholder='Starting XR'
                value={this.state.XR}
                onChange={this.handleChange}
                size='8'
              />
              <label className="text" htmlFor='ErrorApox'>&emsp;Error :&emsp;</label>
              <input className="input"
                name='ErrorApox'
                placeholder='ErrorApox'
                value={this.state.ErrorApox}
                onChange={this.handleChange}
                size='5'
              />
              </div>
              <p></p>
              <div className="bg-font">
              <label className="text" htmlFor='Funct'>&emsp;Function :&emsp;</label>
              <input className="inputfunction"
                name='Funct'
                placeholder='Input function here!'
                value={this.state.Funct}
                onChange={this.handleChange}
                size='30'
              />
            </div>
            <p></p>
            <div className="bg-font">
            &emsp;<button className="botton">Calculate</button>
            </div>
          </form>
          
        )
      }
    }
    
    



export default Falseposition