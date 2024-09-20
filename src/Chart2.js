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

function Chart2() {  

  const [data, setData] = useState();

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data2").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          setData(data);
          
      })
  );
  }, []);

  var labels = data && data.map(item => item.date_at);
  var posts_care = data && data.map(item => item.posts_care);
  var apps_care = data && data.map(item => item.apps_care);

  const data2 = {
    labels: labels,
    datasets: [

      {
        yAxisID: "y1",
        type: "line",
        label: "공고등록수",
        data: posts_care,
        backgroundColor: "rgb(240, 248, 255, 0.7)", // Setting up the background color for the dataset
        borderColor: "#000000", // Setting up the border color for the dataset
        borderWidth: 0.7,
        fill: true,
        tension: 0.1,
      },
      {
        yAxisID: "y1",
        type: "line",
        label: "공고지원수",
        data: apps_care,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.1,
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
                text: "공고지원수",
                font:
                    {size:20},
            },
            ticks: {
                font:
                    {size:20},
            },
            max: 1100,
        },
        y2: {
            display: true,
            beginAtZero: false,
            position: "right",
            grid: {
                drawOnChartArea: false,
            },
            title: {
                display: true,
                text: "공고등록수",
                font:
                    {size:2},
            },
            ticks: {
                font:
                    {size:20},
            },
            max: 1100,
            min: 200,
        },
        },

    plugins: {

        title : {
            display: true,
            text: '최근 1년 공고등록/지원 - 7일 평균',
            font : {
                size: 30
            }},

        legend: {
            display: true,
            labels: {
                font: {
                    size: 24
                }
            }},
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
    },};


  return (

        <><div className="App"> 
        
        <div style ={{width: '140vh', heigth: '140vh'}}><Line data={data2} options={options} plugins={ChartDataLabels} /> 
        
        </div>
     
        </div></>   
                
    );

  }

export default Chart2;