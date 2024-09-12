import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto"; // Importing the Chart.js library

import { Line } from "react-chartjs-2"; 
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	PointElement,
	LineElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	PointElement,
	LineElement
);



function Chart0() {

  
  const [data, setData] = useState();

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          setData(data);
          
      })
  );
  }, []);

  var labels = data && data.map(item => item.date_at);
  var service_care = data && data.map(item => item.service_care);
  var care_A = data && data.map(item => item.care_A);
  var care_B = data && data.map(item => item.care_B);
  var care_C = data && data.map(item => item.care_C); 

const data2 = {
    labels: labels,
    datasets: [
        {
            yAxisID: "y1",
            type: "line",
            label: "간병",
            data: service_care,
            backgroundColor: "rgb(240, 248, 255, 0.4)", // Setting up the background color for the dataset
            borderColor: "#000000",// Setting up the border color for the dataset
            fill: true,
            borderWidth: 0.7,
            
        },

        {
            yAxisID: "y1",
            type: "line",
            label: "일반간병 공고만 진행한 케어메이트",
            data: care_C,
            backgroundColor: "rgb(25, 25, 112,0.2)",
            borderColor: "rgb(25, 25, 112,1)",
            borderWidth: 0.7,
            fill: true,
            tension: 0.1,
        },

        {
            yAxisID: "y1",
            type: "line",
            label: "가족간병 공고만 진행한 케어메이트",
            data: care_A,
            backgroundColor: "rgb(95, 158, 160, 0.2)",
            borderColor: "rgb(95, 158, 160)",
            borderWidth: 0.7,
            fill: true,
            tension: 0.1,
        },

        {
            yAxisID: "y1",
            type: "line",
            label: "두 공고 모두 진행한 케어메이트",
            data: care_B,            
            backgroundColor: "rgb(100, 149, 237,0.4)",
            borderColor: "rgb(100, 149, 237)",
            borderWidth: 0.7,
            fill: true,
            tension: 0.5,
        },

        
    ], 
    }

  const options = {
        scales: {

            x: {
                ticks: {
                    font:
                        {size:20},
                }
    
            }, 
            y1: {
                beginAtZero: false,
                position: "left",
                title: {
                    display: true,
                    text: "서비스 진행 수",
                    font: {size:20}
                },

                ticks: {
                    font:
                        {size:20},
                },
                max: 1600,
            },
            y2: {
                display: false,
                beginAtZero: false,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "서비스 진행 수",
                    font: {size:20}
                },

                ticks: {
                    font:
                        {size:20},
                },
                max: 1600,
            },
            },

        plugins: {

            title : {
                display: true,
                text: '최근 1년 서비스 진행 - 7일 평균',
                font : {
                    size: 30
                }


            }, 

            legend: {
                display: true,
                labels: {
                    
                    font:{
                        size: 25
                    }
                },
                
            
            },
                   


            datalabels: {
                formatter: (value, context) => {
                    // 현재 데이터 포인트의 인덱스를 사용하여 time_count 값을 찾음
                    const timeCount = data[context.dataIndex].date_at;
                    return timeCount + "건";
                },
                display: function (context) {
                    // yAxisID가 'y2'인 데이터셋의 레이블은 표시하지 않음
                    return context.dataset.yAxisID !== "y2";
                },
                color: "black",
                anchor: "end",
                align: "left",
            },


            tooltip: {
                titleFont: {
                    size: 25
                },
                bodyFont: {
                    size: 25
                }
            },
            
        },
    };

  return (

    <><div className="App"> 

      <div style ={{width: '2000px'}}><Line data={data2} options={options} plugins={ChartDataLabels} /> 
  
      </div>
  
     </div></>
    
              
  );

}
 

export default Chart0;