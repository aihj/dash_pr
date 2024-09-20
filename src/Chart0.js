import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto"; // Importing the Chart.js library

import j_data from './data.json';


import { useRef } from 'react';
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';


import { getElementAtEvent, Line } from "react-chartjs-2"; 
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
  const [clickdata, setClickdata] = useState('');
  const [daydata, setDaydata] = useState('');
  const [weekdata, setWeekdata] = useState('');




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
            label: "가족간병 공고만 진행한 케어메이트",
            data: care_A,
            backgroundColor: "rgb(95, 158, 160)",
            borderColor: "rgb(95, 158, 160)",
            borderWidth: 0.7,
            fill: false,
            tension: 0.1,
        },

        {
            yAxisID: "y1",
            type: "line",
            label: "두 공고 모두 진행한 케어메이트",
            data: care_B,            
            backgroundColor: "rgb(100, 149, 237)",
            borderColor: "rgb(100, 149, 237)",
            borderWidth: 0.7,
            fill: false,
            tension: 0.5,
        },
        {
            yAxisID: "y1",
            type: "line",
            label: "간병",
            data: service_care,
            backgroundColor: "#000000", // Setting up the background color for the dataset
            borderColor: "#000000",// Setting up the border color for the dataset
            fill: false,
            borderWidth: 0.7,
            
        },

        {
            yAxisID: "y1",
            type: "line",
            label: "일반간병 공고만 진행한 케어메이트",
            data: care_C,
            backgroundColor: "rgb(25, 25, 112,1)",
            borderColor: "rgb(25, 25, 112,1)",
            borderWidth: 0.7,
            fill: false,
            tension: 0.1,
        },

        

        

        
    ], 
    }
  const options = {
        
        scales: {

            x: {
                ticks: {
                    min: '2023-09-20',
                    step: 
                        {size:7},
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
                
            },},

        onClick: (e, element) => {

            if (element.length > 0) {       
                
                
                // 예시 URL 배열, 실제 데이터에 맞게 조정 필요
                const index = element[0].index
                const value = j_data[index];
                
                setClickdata(value);
                setDaydata(j_data[index-1]);
                setWeekdata(j_data[index-7]);                
            }}
    };

    const columns = [
        { key: 'data', name: 'data'},

        { key: '건수', name: '건수' },
        { key: '전일대비', name: '전일대비' },
        { key: '전주대비', name: '전주대비' }
        ];
    
    const  rows = [
    { data : '간병수', 건수: clickdata.service_care.toFixed(3) , 전일대비: ((clickdata.service_care-daydata.service_care)/clickdata.service_care).toFixed(3)+'%', 
       전주대비: ((clickdata.service_care-weekdata.service_care)/clickdata.service_care).toFixed(3) },
    { data : 'A', 건수: clickdata.care_A.toFixed(3), 전일대비: ((clickdata.care_A-daydata.care_A)/clickdata.care_A).toFixed(3), 
        전주대비: ((clickdata.care_A-weekdata.care_A)/clickdata.care_A).toFixed(3)},
    { data : 'B', 건수: clickdata.care_B.toFixed(3), 전일대비: ((clickdata.care_B-daydata.care_B)/clickdata.care_B).toFixed(3), 
        전주대비: ((clickdata.care_B-weekdata.care_B)/clickdata.care_B).toFixed(3)},
    { data : 'C', 건수: clickdata.care_C.toFixed(3), 전일대비: ((clickdata.care_C-daydata.care_C)/clickdata.care_C).toFixed(3), 
        전주대비: ((clickdata.care_C-weekdata.care_C)/clickdata.care_C).toFixed(3)},
    { data : '승인수', 건수: clickdata.pay_care.toFixed(3), 전일대비:  ((clickdata.pay_care-daydata.pay_care)/clickdata.pay_care).toFixed(3), 
        전주대비: ((clickdata.pay_care-weekdata.pay_care)/clickdata.pay_care).toFixed(3)},
    { data : '취소수', 건수: clickdata.cancel_care.toFixed(3), 전일대비:  ((clickdata.cancel_care-daydata.cancel_care)/clickdata.cancel_care).toFixed(3), 
        전주대비: ((clickdata.cancel_care-weekdata.cancel_care)/clickdata.cancel_care).toFixed(3)},
    { data : '승인액(억원)', 건수: clickdata.approved_amt.toFixed(3), 전일대비: ((clickdata.approved_amt-daydata.approved_amt)/clickdata.approved_amt).toFixed(3), 
        전주대비: ((clickdata.approved_amt-weekdata.approved_amt)/clickdata.approved_amt).toFixed(3)},
    { data : '취소액(억원)', 건수: clickdata.canceled_amt.toFixed(3), 전일대비: ((clickdata.canceled_amt-daydata.canceled_amt)/clickdata.canceled_amt).toFixed(3), 
        전주대비: ((clickdata.canceled_amt-weekdata.canceled_amt)/clickdata.canceled_amt).toFixed(3)},
    { data : '공고등록수', 건수: clickdata.posts_care.toFixed(3), 전일대비:((clickdata.posts_care-daydata.posts_care)/clickdata.posts_care).toFixed(3), 
        전주대비: ((clickdata.posts_care-daydata.posts_care)/clickdata.posts_care).toFixed(3)},
    { data : '공고지원수', 건수: clickdata.apps_care.toFixed(3), 전일대비: ((clickdata.apps_care-daydata.apps_care)/clickdata.apps_care).toFixed(3), 
        전주대비: ((clickdata.apps_care-daydata.apps_care)/clickdata.apps_care).toFixed(3)}
    ];


   return (

    <>
    
      <div className="App"> 

      <div style ={{display: 'flex', gap: '20px' }}>
      
      <div style ={{width: '130vh', height: '140vh'}}>
      <Line data={data2} options={options} plugins={ChartDataLabels}  /> 
      </div>
       
      <div style ={{width: '35vh', height: '140vh', margin: '100px 0 0 0'}}>   
      <h4>선택일: {clickdata.date_at}</h4>
      <br />
      <DataGrid columns={columns} rows={rows} />
      </div> 
          
      </div>
    </div>

    </>            
    );

    }
    

export default Chart0;

