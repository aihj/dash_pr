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



function Chart1() {

  
  const [data, setData] = useState();

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data1").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          setData(data);
          
      })
  );
  }, []);

  var labels = data && data.map(item => item.date_at);
  var pay_care = data && data.map(item => item.pay_care);
  var cancel_care = data && data.map(item => item.cancel_care);
  var approved_amt = data && data.map(item => item.approved_amt);
  var canceled_amt = data && data.map(item => item.canceled_amt);
 

const data2 = {
    labels: labels,
    datasets: [
        {
            yAxisID: "y1",
            type: "line",
            label: "간병 - 승인수",
            data: pay_care,
            backgroundColor: "rgb(240, 248, 255, 0.4)", // Setting up the background color for the dataset
            borderColor: "#000000",// Setting up the border color for the dataset
            fill: true,
            borderWidth: 1,
            
        },
        {
            yAxisID: "y1",
            type: "line",
            label: "간병 - 취소수",
            data: cancel_care,
            backgroundColor: "rgb(25, 25, 112,0.4)",
            borderColor: "rgb(25, 25, 112,1)",
            borderWidth: 0.8,
            fill: true,
            tension: 0.1,
        },


        
    ], 
    }

    const data3 = {
        labels: labels,
        datasets: [
            {
                yAxisID: "y1",
                type: "line",
                label: "간병 - 승인액",
                data: approved_amt,
                backgroundColor: "rgb(240, 248, 255, 0.4)", // Setting up the background color for the dataset
                borderColor: "#000000",// Setting up the border color for the dataset
                fill: true,
                borderWidth: 1,
                
            },
            {
                yAxisID: "y1",
                type: "line",
                label: "간병 - 취소액",
                data: canceled_amt,
                backgroundColor: "rgb(25, 25, 112,0.4)",
            borderColor: "rgb(25, 25, 112,1)",
                borderWidth: 0.8,
                fill: true,
                tension: 0.1,
            },
    
    
            
        ], 
        }

  const options = {
        
    
        scales: {
            x:  {
                ticks: {
                    font:
                        {size:20},
                },
            },
            y1: {
                beginAtZero: false,
                position: "left",
                title: {
                    display: true,
                    text: "승인/취소 수",
                    font: {size:20}
                },
                max: 600,
                ticks: {
                    font:
                        {size:20},
                },
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
                    text: "승인/취소 수",
                    font: {size:20}
                },
                max: 600,
                ticks: {
                    font:
                        {size:20},
                },
            },
            },

        plugins: {
            title : {
                display: true,
                text: '최근 1년 승인/취소 - 7일 평균',
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
              }
        },
    };

    const options1 = {
        scales: {
            x: {
                ticks: {
                    font:
                        {size:20},
                },
            },
            y1: {
                beginAtZero: false,
                position: "left",
                title: {
                    display: true,
                    text: "금액 (단위: 억원)",
                    font: {size:20},
                },
                max: 2,
                ticks: {
                    font:
                        {size:20},
                },
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
                    text: "금액 (단위: 억원)",
                    font: {size:25},
                },
                max: 2,
                ticks: {
                    font:
                        {size:20},
                },
            },
            },

        plugins: {
            title : {
                display: true,
                text: '최근 1년 승인/취소액 (단위: 억원) - 7일 평균',
                font : {
                    size: 30
                }},
            legend: {
                display: true,
                labels: {
                    
                    font: {
                        size: 25
                    }
                }
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
                align: "top",
            },

            tooltip: {
                titleFont: {
                    size: 25
                },
                bodyFont: {
                    size: 25
                }
              }
        },
    };

  return (

    <><div className="App"> 
    

      <div style ={{width: '2000px'}}><Line data={data2} options={options} plugins={ChartDataLabels} /> </div>
      <br />
      <br />
      <div style ={{width: '2000px'}}><Line data={data3} options={options1} plugins={ChartDataLabels} /> </div>
  
     </div></>
    
              
  );

}
 

export default Chart1;