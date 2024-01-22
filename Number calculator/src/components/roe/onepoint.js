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

import Chart, {
  ArgumentAxis,
  Label,
  Legend,
  Series,
} from 'devextreme-react/chart';


const Parser = require('expr-eval').Parser;

class Onepoint extends React.Component
{


    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    
  
    OnepointCalcFunction(X,ErrorApox,Funct)
    {
     
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }

        var xi=0;
        var x = parseFloat(X);
        var inputerrorapox = parseFloat(ErrorApox)
        var err = 1000000;
        var arr=[];

        if(X!=null && Funct!=null && inputerrorapox!=null){
            var i=0;
            while(err>inputerrorapox)
                {
                  i++;
                  xi = x;
                  fx(x);
                  x = fx(x);
                  err = Math.abs((x-xi)/x)*100
                  arr.push({xi,err});
            }
            
            render ( 
              <Chart id="chart" dataSource={arr}>
              <Series
                valueField="err"
                argumentField="xi"
                name="Error"
                type="line"
                color="#e2b714" />
            </Chart>
            );
        }
        else{
          return <span className="ansZone">"Input X,ErrorApox and Function first!!";</span>
        }
        
      }
      
    


    handleSubmit(event){
        const {X,ErrorApox,Funct} = this.state
       
        const xm = this.OnepointCalcFunction(X,ErrorApox,Funct)
        event.preventDefault()
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
                    <h1>One-Point Iteration</h1>
                    <h1>
                        
                    </h1>
                </div>
                
              <label className="text" htmlFor='X'>&emsp;X :&emsp;</label>
              <input className="input"
                name='X'
                placeholder='Starting X'
                value = {this.state.X}
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
              <label  className="text" htmlFor='Funct'>&emsp;Function :&emsp;</label>
              <input className="inputfunction"
                name='Funct'
                placeholder='Input function'
                value={this.state.Funct}
                onChange={this.handleChange}
                size='30'
              />
            </div>
            <p></p>
            <div className="bg-font">
            &emsp;<button className="botton"
             color="success"
            size="lg"
            to="/album-carousel-page">
                Calculate</button>
            </div>
          </form>
          
        )
      }
    }
export default Onepoint