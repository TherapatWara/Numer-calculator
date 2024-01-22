import { render } from "@testing-library/react";
import React,{ Component } from 'react'
import { useState } from 'react'
import Chart, {
  ArgumentAxis,
  Label,
  Legend,
  Series,
} from 'devextreme-react/chart';

const Parser = require('expr-eval').Parser;


class Graphical extends React.Component
{   
    constructor(props)
    {
        super(props)
        this.state = {XL:'',XR:'',ErrorApox:'',func:''}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)    

        this.state = {
          options: {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: []
            }
          },
          arr1: [
            {
              name: "series-1",
              data: []
            }
          ]
        }; 
    }



    GraphicalCalcFunction(XL,XR,ErrorApox,Funct)
    {
      
        let className='ansZone';
        const parser = new Parser();
        function fx(x)
        {
            let expr = parser.parse(Funct)
            console.log("fx = "+expr.evaluate({ x: (x) }))
            return expr.evaluate({ x: (x) })
        }
     
        var x=0;
        var xl = parseFloat(XL);
        var xr = parseFloat(XR);
        var inputerrorapox = parseFloat(ErrorApox)
        var arr = [];
        var ErrorApox_Answer=10000000;
        var ans;
        var oldans;
        
 
        if(xl!=null && xr!=null && Funct!=null && inputerrorapox!=null){
            var i=0;
            for(x=xl;x<=xr;x+=0.001)
            {
                i++;
                fx(x);
                if(fx(x)>-1*ErrorApox && fx(x)<ErrorApox)
                {
                    break;
                }
                ans = Math.floor(x*1000000)/1000000;
                ErrorApox_Answer = Math.abs((ans-oldans)/ans)*100
                oldans = ans;
                arr.push({ErrorApox_Answer,ans})
                
                
                //render("Answer="+arr1+" at Iteration = "+arr2)
            }
          


              render ( 
                <Chart id="chart" dataSource={arr}>
                <Series
                  valueField="ErrorApox_Answer"
                  argumentField="ans"
                  name="Error"
                  type="line"
                  color="#e2b714" />
              </Chart>
              );
              return <span className="ansZone">Answer is {ans} Iteration = {i}</span>
            
            
           
        }
        else{
          return <span className="ansZone">"Input XL,XR,ErrorApox and Function first!!";</span>
        }
        
      }
      
    


    handleSubmit(event){
        const {XL,XR,ErrorApox,Funct} = this.state
       
        const xm = this.GraphicalCalcFunction(XL,XR,ErrorApox,Funct)
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
                    <h1>Graphical Method</h1>
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
    
    



export default Graphical