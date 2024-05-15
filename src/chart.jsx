import {React, useEffect, useState} from 'react'
import { Bar,Line } from 'react-chartjs-2'
import 'chart.js/auto';
import axios from 'axios'

export default function ChartCompt() {
  const fixUrl = "http://192.168.190.213"
  
  const getUrl= `${fixUrl}:3000/api/tasks`
  const [instadata,setInstaData] = useState([])
  const [bookdata,setBookData] = useState([])
  const fetchData = async () => {
    try {
      const { data } = await axios.get(getUrl);
      console.log(data)
      setInstaData(data.Instagram)
      setBookData(data.Book)
       // Update this line
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchData()
    console.log('hello')
  },[])


let daily_avg = (instadata + bookdata )/60
let weeekly_total = daily_avg * 7

  return (
    <>
    <Bar 
      data={{
        labels:['Mon','Tues' ,'Wed' ],
        datasets:[
          {
            label:"Time spent on Mobile (hrs)",
            data:[150,500,instadata]
          }
        ]

      }}
      height={900}
      width={750}



    className='chart-container'/>
    <Bar 
    
     data={
    
      {
        labels:['Mon','Tues','Wed','Thur','Fri','Sat','Sun'],
      
        datasets:[
          {
            label:'Instagram',
            data:[150,250,instadata,4,7,9,11.5],
            
          },
          {
            label:'Books',
            data:[52,35,bookdata,3,5.5,2,1],
            
          }
        ]

    
      }
      
      }
      
      height={900}
      width={750} 
     
      
      className='line-container'/>


      <div className='stats'>
   
   <div>
       <p>Daily Avg</p>
        <h4>{daily_avg}<sub>m</sub></h4>

   </div>
      <div>

        <p>Weeekly Total</p>
        <h4>{parseInt(weeekly_total)}<sub>H</sub>{parseInt(weeekly_total/60)}<sub>m</sub></h4>

      </div>
<div>
        <p>The Shortest</p>
        <h4>20<sub>H</sub>39<sub>m</sub></h4>
</div>
        
<div>
        <p>The longest </p>
        <h4>40<sub>H</sub>39<sub>m</sub></h4>
</div>
        
      </div>
    </>

  )
}
