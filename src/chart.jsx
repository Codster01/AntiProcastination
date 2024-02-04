import React from 'react'
import { Bar,Line } from 'react-chartjs-2'
import 'chart.js/auto';
export default function ChartCompt() {
  return (
    <>
    <Bar 
      data={{
        labels:['Mon','Tues','Wed','Thur','Fri','Sat','Sun'],
        datasets:[
          {
            label:"Time spent on Mobile (hrs)",
            data:[2,4,3,7.5,1,6,5]
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
            data:[10,11,7,4,7,9,11.5],
            
          },
          {
            label:'Books',
            data:[6,4,5,3,5.5,2,1],
            
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
        <h4>5<sub>H</sub>39<sub>m</sub></h4>

   </div>
      <div>

        <p>Weeekly Total</p>
        <h4>40<sub>H</sub>39<sub>m</sub></h4>

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
