import React from 'react'
import { Container,Form,Button,Table} from 'react-bootstrap';


class Cramer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {val:[[]],show_total:[],size_array:'',show_matrix_web:[]}
        this.handleChange = this.handleChange.bind(this) 
        this.handleAdd = this.handleAdd.bind(this)
        this.CramerCal = this.CramerCal.bind(this)
    }

    handleAdd=(e)=>{
      var array = [[]]
      for(var i=0;i<Number(e.target.value);i++)
      {
        array[i]= [];
        console.log(array);
        for(var k=0;k<Number(e.target.value)+1;k++)
        {
          array[i][k]= `${i} ${k}`;
        }
      }
        this.setState({val:(array)})
        this.setState({size_array:(Number(e.target.value))})
     }


    CramerCal(size_array,val,show_web)
    {
      var a = [[]]
      var k=0,i=0,j=0
      for(i=0;i<size_array;i++)
      {
        a[i]= [];
        for(k=0;k<size_array+1;k++)
        {
            a[i][k] = val[i][k]
        }
  
      }
  
     var x = []
  
      for(k=0;k<size_array;k++){
          for(i=k+1;i<size_array;i++){
              var temp = a[i][k]/a[k][k]
              for(j=k+1;j<=size_array;j++){
                  a[i][j] = a[i][j] - temp*a[k][j]
              }
          }
      }
      
      for(i=size_array-1;i>=0;i--){
          x[i] = a[i][size_array]
          for(j=i+1;j<size_array;j++){
              x[i] = x[i]-a[i][j]*x[j]
          }
          x[i] = x[i]/a[i][i]
      }
      
      for(i=0;i<size_array;i++){
          console.log(x[i])
     
      }
      this.setState({show_total:(x)})
     
      show_web =[[]]
      for(i=0;i<size_array;i++)
      {
        show_web[i]= [];
        for(k=0;k<size_array+1;k++)
        {
          if(k<size_array-1)
          {
          show_web[i][k] = `(${val[i][k]} *(${x[k]}))+`
          }
          else if(k<size_array)
          {
            show_web[i][k] = `(${val[i][k]} *(${x[k]}))`
          }
          else if(k===size_array){
            show_web[i][k] = ` = ${val[i][k]}`
          }
        }
  
  
      }
      console.log(show_web)
      this.setState({show_matrix_web:(show_web)})
  
      
    }



    handleChange(rowIndex, columnIndex, e){
      this.state.val[rowIndex][columnIndex] =  Number(e.target.value);
     }

    render(){
        return(
          <>
          <div className="bg-font">
            <div className='logo'>
                <h1 >Cramer Rule</h1>
            </div>
          
          <Container>
          <Form className="inputmatrix" >
                <Form.Group >
                    <Form.Control size="lg" type="text" name = "dimentions" onChange={this.handleAdd} placeholder="Input Number of Dimentions" />
                </Form.Group>
            </Form>
          <br></br>
          <br></br>
          
          <Table responsive="sm" className="inputmatrix">
                <tbody>
          {this.state.val.map((row, rowIndex) => (
                  <tr>
                    {row.map((column, columnIndex) => (
                      
                      <td >
                        <input id={column} onChange={e => this.handleChange(rowIndex, columnIndex, e)}/>
                      </td>
      
                    ))}
                  </tr>

                ))}

    </tbody>
        </Table>


                <br></br>
               <Button className= "botton" onClick={()=>this.CramerCal(this.state.size_array, this.state.val, this.state.show_web)}>Calulate</Button>
               </Container>
               <div className="ansZoneMatrix">

               
               {this.state.show_total.map((total,i)=>(
                <>
                
                <h1 id={i}>X{i+1}&nbsp; &nbsp;{total}</h1>
                </>
               ))
  
               
               }
  
              {this.state.show_matrix_web.map((show_martix,count)=>(
                <h1 id={count}>แถวที่{count+1}&nbsp; &nbsp; {show_martix}</h1>
  
               ))
  
               
               }
               </div>
  
               
  
      </div>
      </>
          
        )
      }
    }
    
    



export default Cramer