import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import * as math from "mathjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getDisplayName } from "@mui/utils";




const Parser = require('expr-eval').Parser;

class Newton extends React.Component
{


    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
    }

    
  
    NewtonCalcFunction(X,ErrorApox,Funct)
    {
     
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }

        
        var x = parseFloat(X);
        var x1=x;
        var inputerrorapox = parseFloat(ErrorApox)
        var arr=[];
        var check = 99;
        var fdx,ff;

        if(X!=null && Funct!=null && inputerrorapox!=null){
            var i=0;
            
            while(check != inputerrorapox)
            {
                i++;
                if((check>=0-inputerrorapox)&&(check<=0+inputerrorapox))
                {
                    break;
                } 
                ff = fx(x);
                fdx = math.derivative(Funct, 'x').evaluate({x: (x)});

                x1 = x-(ff/fdx) //newton
                check = Math.abs((x1-x)/x1)*100
                x = x1;
                arr.push({i,check,x})
            }
            
            render ( 
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
            <TableCell align="left">X</TableCell>
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
              <TableCell align="left">{arr.x}</TableCell>
              <TableCell align="left">{arr.check}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            );
            return <span className="ansZone">Answer is {x} </span>
        }
        else{
          return <span className="ansZone">"Input X,ErrorApox and Function first!!";</span>
        }
        
      }
      
    


    handleSubmit(event){
        const {X,ErrorApox,Funct} = this.state
       
        const xm = this.NewtonCalcFunction(X,ErrorApox,Funct)
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
                    <h1>Newton Raphson</h1>
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
export default Newton