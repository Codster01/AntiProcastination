import { React, useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

export default function ChartCompt() {
  const fixUrl = "http://192.168.53.213";
  const getUrl = `${fixUrl}:3000/api/tasks`;

  const [instadata, setInstaData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  const [remainingStudyTime, setRemainingStudyTime] = useState(0);
  const [remainingEntertainmentTime, setRemainingEntertainmentTime] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(getUrl);
      const data = response.data;
      console.log(data);

      setInstaData(data.totalDifferences['Instagram']);
      setBookData(data.totalDifferences['Book']);
      setRemainingStudyTime(data.recommendation['remainingStudyTime']);
      setRemainingEntertainmentTime(data.recommendation['remainingEntertainmentTime']);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('Data fetched');
    console.log(instadata, bookdata, remainingStudyTime, remainingEntertainmentTime)
  }, []);

  let dailyAvg = (instadata + bookdata) / 60;
  let weeklyTotal = dailyAvg * 7;

  return (
    <>
      <div>
        <Bar
          data={{
            labels: ['Mon', 'Tues', 'Wed', 'Thur' ,'Fri' ,'Sat' , 'Sun'],
            datasets: [
              {
                label: "Time spent on Mobile (hrs)",
                data: [150, 500, 455,instadata,300,233,560]
              }
            ]
          }}
          height={400}
          width={600}
          className='chart-container'
        />
      </div>
      <div>
        <Bar
          data={{
            labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Instagram',
                data: [150, 250, instadata , 4, 7, 9, 11.5]
              },
              {
                label: 'Books',
                data: [52, 35, bookdata , 3, 5.5, 2, 1]
              }
            ]
          }}
          height={400}
          width={600}
          className='line-container'
        />
      </div>
      <div>
        <Bar
          data={{
            labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Remaining Study Time (hrs)',
                data: [remainingStudyTime , remainingStudyTime , remainingStudyTime , remainingStudyTime , remainingStudyTime , remainingStudyTime , remainingStudyTime ]
              },
              {
                label: 'Remaining Entertainment Time (hrs)',
                data: [remainingEntertainmentTime , remainingEntertainmentTime , remainingEntertainmentTime , remainingEntertainmentTime , remainingEntertainmentTime , remainingEntertainmentTime , remainingEntertainmentTime ]
              }
            ]
          }}
          height={400}
          width={600}
          className='chart-container'
        />
      </div>

      <div className='stats'>
        <div>
          <p>Daily Avg</p>
          <h4>{dailyAvg.toFixed(2)}<sub>m</sub></h4>
        </div>
        <div>
          <p>Weekly Total</p>
          <h4>{Math.floor(weeklyTotal)}<sub>H</sub> {Math.floor((weeklyTotal % 1) * 60)}<sub>m</sub></h4>
        </div>
        <div>
          <p>The Shortest</p>
          <h4>20<sub>H</sub> 39<sub>m</sub></h4>
        </div>
        <div>
          <p>The Longest</p>
          <h4>40<sub>H</sub> 39<sub>m</sub></h4>
        </div>
      </div>
    </>
  );
}
