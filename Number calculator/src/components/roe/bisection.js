import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Chart, {
  ArgumentAxis,
  Label,
  Legend,
  Series,
} from 'devextreme-react/chart';

const Parser = require('expr-eval').Parser;


class Bisection extends React.Component
{   
    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    
        this.handleSubmitAPI = this.handleSubmitAPI.bind(this)   

    }



    BisectionCalcFunction(XL,XR,ErrorApox,Funct)
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
                xm=(xl+xr)/2;
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
          <Chart id="chart" dataSource={arr}>
                <Series
                  valueField="ErrorApox_Answer"
                  argumentField="xm"
                  name="Error"
                  type="line"
                  color="#e2b714" />
              </Chart>
          
        )
        return <span className="ansZone">Answer is {xm} Itelation = {i}</span>
      }
      
      else{
        return <span className="ansZone">"Input XL,XR,ErrorApox and Function first!!"</span>
      }
      
    }
      
    


    handleSubmit(event){
        const {XL,XR,ErrorApox,Funct} = this.state
       
        const xm = this.BisectionCalcFunction(XL,XR,ErrorApox,Funct)
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

    handleSubmitAPI(event){
      event.preventDefault()
      axios.get('http://localhost:3700/bisection')
            .then(res => {
              const data = res.data
              console.log(data)
              this.setState({XL: res.data[0].xl})
              this.setState({XR: res.data[0].xr})
              this.setState({ErrorApox: res.data[0].ErrorApox})
              this.setState({Funct: res.data[0].Funct})
            })
    }

    render(){
        return(
          <form >
            <div className="bg-font">
                <div className="logo">
                    <h1>Bisection Method</h1>
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
            &emsp;<button onClick={this.handleSubmit} className="botton">Calculate</button>
            &emsp;<button  onClick={this.handleSubmitAPI}  className="botton">API</button>
            </div>
          </form>
          
          
        )
      }
    }
    
    



export default Bisection