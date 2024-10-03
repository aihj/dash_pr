import React, { useState, useEffect } from 'react';

import { Line } from "react-chartjs-2"; 
import DatePicker from 'react-datepicker';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import Moment from 'moment';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import 'ag-grid-community/styles/ag-theme-alpine.css';


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
    
    const [clickdata, setClickdata] = useState({date_at: "Please pick a date", care_A:0, care_B:0, care_C:0, service_care: 0, service_dh:0, service_hk:0, cancel_care:0, cancel_dh:0, cancel_hk:0, pay_care:0, pay_dh:0, pay_hk:0, posts_care:0, posts_hk:0, posts_dh:0, apps_care: 0, apps_dh:0, apps_hk:0, approved_amt: 0, canceled_amt:0, approved_amt_h: 0, canceled_amt_h:0, approved_amt_d: 0, canceled_amt_d:0});
    const [daydata, setDaydata] = useState({date_at: "Please pick a date", care_A:0, care_B:0, care_C:0, service_care: 0, service_dh:0, service_hk:0, cancel_care:0, cancel_dh:0, cancel_hk:0, pay_care:0, pay_dh:0, pay_hk:0, posts_care:0, posts_hk:0, posts_dh:0, apps_care: 0, apps_dh:0, apps_hk:0, approved_amt: 0, canceled_amt:0, approved_amt_h: 0, canceled_amt_h:0, approved_amt_d: 0, canceled_amt_d:0});
    const [weekdata, setWeekdata] = useState({date_at: "Please pick a date", care_A:0, care_B:0, care_C:0, service_care: 0, service_dh:0, service_hk:0, cancel_care:0, cancel_dh:0, cancel_hk:0, pay_care:0, pay_dh:0, pay_hk:0, posts_care:0, posts_hk:0, posts_dh:0, apps_care: 0, apps_dh:0, apps_hk:0, approved_amt: 0, canceled_amt:0, approved_amt_h: 0, canceled_amt_h:0, approved_amt_d: 0, canceled_amt_d:0});

    const moment = require('moment');
  
    const [startDate, setStartDate] = useState(new Date().setYear(2024-1));
    const [endDate, setEndDate] = useState(new Date().setYear(2024));
   
    
  
    useEffect((data) => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setData(data.filter(item => item["date_at"] <= moment(endDate).format('YYYY-MM-DD')
            &&  item["date_at"]>=  moment(startDate).format('YYYY-MM-DD') ));
            
        })
    );
    }, [data]);

  var labels = data && data.map(item => item.date_at);
  var posts_care = data && data.map(item => item.posts_care);
  var apps_care = data && data.map(item => item.apps_care);

  var posts_hk = data && data.map(item => item.posts_hk);
  var apps_hk = data && data.map(item => item.apps_hk);

  var posts_dh = data && data.map(item => item.posts_dh);
  var apps_dh = data && data.map(item => item.apps_dh);




  const data_c = {
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
        fill: false,
        tension: 0.1,
      },
      {
        yAxisID: "y1",
        type: "line",
        label: "공고지원수",
        data: apps_care,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "#000000",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
        },
        ],
     }


    const data_h = {
    labels: labels,
    datasets: [

        {
        yAxisID: "y1",
        type: "line",
        label: "공고등록수",
        data: posts_hk,
        backgroundColor: "rgb(240, 248, 255, 0.7)", // Setting up the background color for the dataset
        borderColor: "#000000", // Setting up the border color for the dataset
        borderWidth: 0.7,
        fill: false,
        tension: 0.1,
        },
        {
        yAxisID: "y1",
        type: "line",
        label: "공고지원수",
        data: apps_hk,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "#000000",
        borderWidth: 1,
        fill: false,
        tension: 0.1,
        },
        ],
    }


    const data_d = {
        labels: labels,
        datasets: [
    
            {
            yAxisID: "y1",
            type: "line",
            label: "공고등록수",
            data: posts_dh,
            backgroundColor: "rgb(240, 248, 255, 0.7)", // Setting up the background color for the dataset
            borderColor: "#000000", // Setting up the border color for the dataset
            borderWidth: 0.7,
            fill: false,
            tension: 0.1,
            },
            {
            yAxisID: "y1",
            type: "line",
            label: "공고지원수",
            data: apps_dh,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "#000000",
            borderWidth: 1,
            fill: false,
            tension: 0.1,
            },
            ],
        }
    



  const options = {
    
    scales: {
        x: {
            ticks: {
                font:
                    {size:15},
            }

        },

        y1: {
            beginAtZero: false,
            position: "left",
            title: {
                display: true,
                text: "공고등록/지원수",
                font:
                    {size:18},
            },
            ticks: {
                font:
                    {size:18},
            },
            max: Math.max.data,
        },
    
        },

    plugins: {

        title : {
            display: true,
            text: '최근 공고등록/지원 - 7일 평균',
            font : {
                size: 25
            }},

        legend: {
            display: true,
            labels: {
                font: {
                    size: 20
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
        }},


        onClick: (e, element) => {

        

            if (element.length > 0) {      
                              
                // 예시 URL 배열, 실제 데이터에 맞게 조정 필요
                const index = element[0].index;
                const value = data[index];
                setClickdata(value);                
                setDaydata(data[index-1]);
                    if (index>=7){
                        setClickdata(value);    
                        setWeekdata(data[index-7]); }
                    else{
                        setClickdata({date_at: "Please pick a date", care_A:0, care_B:0, care_C:0, service_care: 1, service_dh:0, service_hk:0, cancel_care:0, cancel_dh:0, cancel_hk:0, pay_care:0, pay_dh:0, pay_hk:0, posts_care:0, posts_hk:0, posts_dh:0, apps_care: 0, apps_dh:0, apps_hk:0, approved_amt: 0, canceled_amt:0, approved_amt_h: 0, canceled_amt_h:0, approved_amt_d: 0, canceled_amt_d:0});   
                        setWeekdata({date_at: "Please pick a date", care_A:0, care_B:0, care_C:0, service_care: 1, service_dh:0, service_hk:0, cancel_care:0, cancel_dh:0, cancel_hk:0, pay_care:0, pay_dh:0, pay_hk:0, posts_care:0, posts_hk:0, posts_dh:0, apps_care: 0, apps_dh:0, apps_hk:0, approved_amt: 0, canceled_amt:0, approved_amt_h: 0, canceled_amt_h:0, approved_amt_d: 0, canceled_amt_d:0});}
                    
                                  
            }}

    };

        

    const  row = [
        { data : '간병수', 건수: clickdata.service_care.toFixed(1) , 전일대비: ((clickdata.service_care-daydata.service_care)*100/daydata.service_care).toFixed(1) +'%', 
            전주대비: ((clickdata.service_care-weekdata.service_care)*100/weekdata.service_care).toFixed(1)+'%'},
        { data : 'A(일반간병)', 건수: parseFloat(clickdata.care_A).toFixed(1), 전일대비: parseFloat((clickdata.care_A-daydata.care_A)*100/daydata.care_A).toFixed(1)+'%', 
            전주대비: parseFloat((clickdata.care_A-weekdata.care_A)*100/weekdata.care_A).toFixed(1)+'%'},
        { data : 'B(일반/가족)', 건수: parseFloat(clickdata.care_B).toFixed(1), 전일대비: parseFloat((clickdata.care_B-daydata.care_B)*100/daydata.care_B).toFixed(1)+'%', 
            전주대비: parseFloat((clickdata.care_B-weekdata.care_B)*100/weekdata.care_B).toFixed(1)+'%'},
        { data : 'C(가족간병)', 건수: parseFloat(clickdata.care_C).toFixed(1), 전일대비: parseFloat((clickdata.care_C-daydata.care_C)*100/daydata.care_C).toFixed(1)+'%', 
            전주대비: parseFloat((clickdata.care_C-weekdata.care_C)*100/weekdata.care_C).toFixed(1)+'%'},
        { data : '승인수', 건수: clickdata.pay_care.toFixed(1), 전일대비:  ((clickdata.pay_care-daydata.pay_care)*100/daydata.pay_care).toFixed(1)+'%', 
            전주대비: ((clickdata.pay_care-weekdata.pay_care)*100/weekdata.pay_care).toFixed(1)+'%'},
        { data : '취소수', 건수: clickdata.cancel_care.toFixed(1), 전일대비:  ((clickdata.cancel_care-daydata.cancel_care)*100/daydata.cancel_care).toFixed(1)+'%', 
            전주대비: ((clickdata.cancel_care-weekdata.cancel_care)*100/weekdata.cancel_care).toFixed(1)+'%'},
        { data : '승인액(억원)', 건수: clickdata.approved_amt.toFixed(1), 전일대비: ((clickdata.approved_amt-daydata.approved_amt)*100/daydata.approved_amt).toFixed(1)+'%', 
            전주대비: ((clickdata.approved_amt-weekdata.approved_amt)*100/weekdata.approved_amt).toFixed(1)+'%'},
        { data : '취소액(억원)', 건수: clickdata.canceled_amt.toFixed(1), 전일대비: ((clickdata.canceled_amt-daydata.canceled_amt)*100/daydata.canceled_amt).toFixed(1)+'%', 
            전주대비: ((clickdata.canceled_amt-weekdata.canceled_amt)*100/weekdata.canceled_amt).toFixed(1)+'%'},
        { data : '공고등록수', 건수: clickdata.posts_care.toFixed(1), 전일대비:((clickdata.posts_care-daydata.posts_care)*100/daydata.posts_care).toFixed(1)+'%',
            전주대비: ((clickdata.posts_care-daydata.posts_care)*100/weekdata.posts_care).toFixed(1)+'%'},
        { data : '공고지원수', 건수: clickdata.apps_care.toFixed(1), 전일대비: ((clickdata.apps_care-daydata.apps_care)*100/daydata.apps_care).toFixed(1)+'%', 
            전주대비: ((clickdata.apps_care-daydata.apps_care)*100/weekdata.apps_care).toFixed(1)+'%'}
        ];

    const  rows1 = [
        { data : '간병수', 건수: clickdata.service_hk.toFixed(1) , 전일대비: ((clickdata.service_hk-daydata.service_hk)*100/daydata.service_hk).toFixed(1)+'%', 
            전주대비: ((clickdata.service_hk-weekdata.service_hk)*100/weekdata.service_hk).toFixed(1)+'%'},
        { data : '승인수', 건수: clickdata.pay_hk.toFixed(1), 전일대비:  ((clickdata.pay_hk-daydata.pay_hk)*100/daydata.pay_hk).toFixed(1)+'%', 
            전주대비: ((clickdata.pay_hk-weekdata.pay_hk)*100/weekdata.pay_hk).toFixed(1)+'%'},
        { data : '취소수', 건수: clickdata.cancel_hk.toFixed(1), 전일대비:  ((clickdata.cancel_hk-daydata.cancel_hk)*100/daydata.cancel_hk).toFixed(1)+'%', 
            전주대비: ((clickdata.cancel_hk-weekdata.cancel_hk)*100/weekdata.cancel_hk).toFixed(1)+'%'},
        { data : '승인액(억원)', 건수: clickdata.approved_amt_h.toFixed(1), 전일대비: ((clickdata.approved_amt_h-daydata.approved_amt_h)*100/daydata.approved_amt_h).toFixed(1)+'%', 
            전주대비: ((clickdata.approved_amt_h-weekdata.approved_amt_h)*100/weekdata.approved_amt_h).toFixed(1)+'%'},
        { data : '취소액(억원)', 건수: clickdata.canceled_amt_h.toFixed(1), 전일대비: ((clickdata.canceled_amt_h-daydata.canceled_amt_h)*100/daydata.canceled_amt_h).toFixed(1)+'%', 
            전주대비: ((clickdata.canceled_amt_h-weekdata.canceled_amt_h)*100/weekdata.canceled_amt_h).toFixed(1)+'%'},
        { data : '공고등록수', 건수: clickdata.posts_hk.toFixed(1), 전일대비:((clickdata.posts_hk-daydata.posts_hk)*100/daydata.posts_hk).toFixed(1)+'%', 
            전주대비: ((clickdata.posts_hk-daydata.posts_hk)*100/weekdata.posts_hk).toFixed(1)+'%'},
        { data : '공고지원수', 건수: clickdata.apps_hk.toFixed(1), 전일대비: ((clickdata.apps_hk-daydata.apps_hk)*100/daydata.apps_hk).toFixed(1)+'%', 
            전주대비: ((clickdata.apps_hk-daydata.apps_hk)*100/weekdata.apps_hk).toFixed(1)+'%'}
        ];

    const  rows2 = [
        { data : '간병수', 건수: clickdata.service_dh.toFixed(1) , 전일대비: ((clickdata.service_dh-daydata.service_dh)*100/daydata.service_dh).toFixed(1)+'%', 
            전주대비: ((clickdata.service_dh-weekdata.service_dh)*100/weekdata.service_dh).toFixed(1)+'%' },
        { data : '승인수', 건수: clickdata.pay_dh.toFixed(1), 전일대비:  ((clickdata.pay_dh-daydata.pay_dh)*100/daydata.pay_dh).toFixed(1)+'%', 
            전주대비: ((clickdata.pay_dh-weekdata.pay_dh)*100/weekdata.pay_hk).toFixed(1)+'%'},
        { data : '취소수', 건수: clickdata.cancel_dh.toFixed(1), 전일대비:  ((clickdata.cancel_dh-daydata.cancel_dh)*100/daydata.cancel_dh).toFixed(1)+'%', 
            전주대비: ((clickdata.cancel_dh-weekdata.cancel_dh)*100/weekdata.cancel_dh).toFixed(1)+'%'},
        { data : '승인액(억원)', 건수: clickdata.approved_amt_d.toFixed(1), 전일대비: ((clickdata.approved_amt_d-daydata.approved_amt_d)*100/daydata.approved_amt_d).toFixed(1)+'%', 
            전주대비: ((clickdata.approved_amt_d-weekdata.approved_amt_d)*100/weekdata.approved_amt_d).toFixed(1)+'%'},
        { data : '취소액(억원)', 건수: clickdata.canceled_amt_d.toFixed(1), 전일대비: ((clickdata.canceled_amt_h-daydata.canceled_amt_d)*100/daydata.canceled_amt_d).toFixed(1)+'%', 
            전주대비: ((clickdata.canceled_amt_d-weekdata.canceled_amt_d)*100/weekdata.canceled_amt_d).toFixed(1)+'%'},
        { data : '공고등록수', 건수: clickdata.posts_dh.toFixed(1), 전일대비:((clickdata.posts_dh-daydata.posts_dh)*100/daydata.posts_dh).toFixed(1)+'%', 
            전주대비: ((clickdata.posts_dh-daydata.posts_dh)*100/weekdata.posts_dh).toFixed(1)+'%'},
        { data : '공고지원수', 건수: clickdata.apps_dh.toFixed(1), 전일대비: ((clickdata.apps_hk-daydata.apps_dh)*100/daydata.apps_dh).toFixed(1)+'%', 
            전주대비: ((clickdata.apps_dh-daydata.apps_dh)*100/weekdata.apps_dh).toFixed(1)+'%'}
        ];

    const [status, setStatus] = useState(1);


    const radioHandler = (status) => {
        setStatus(status);
        };

    const cellClassRules = {
        "cell-pass": params => params.value.slice(0,-1) > 0,
        "cell-fail": params => params.value.slice(0,-1) < 0
        };
    
    const colDefs= [
    { field: "data" ,  width: 120},
    { field: "건수", width: 80 },

    { field: "전일대비", width: 100, cellClassRules: cellClassRules},

    { field: "전주대비" ,width: 100, cellClassRules: cellClassRules}
    ];
        

  return (

        <>
        
         <br />
        

         
        <div className ="DateContainer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="dateInput">
            {"시작일"}
       
        <DatePicker 
        className = "customInput"        
        selected={startDate}
        minDate={new Date("2022-01-13")}
        maxDate={new Date("2024-09-25")}
        onChange ={date => setStartDate(date)}
        dateFormat="yyyy-MM-dd"/>
         </span>
        
        
        <span className="dateInput2">
        {"종료일"}

        <DatePicker 
        className = "customInput"        
        selected={endDate}
        onChange ={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"/>
         </span>
        
        </div>
        
        <div className="App"> 
            
        <div className="radio"> 
         <br />   

        <input type="radio" name="release" checked={status === 1} onClick={(e) => radioHandler(1)} /> 간병&nbsp;
        <input type="radio" name="release" checked={status === 2} onClick={(e) => radioHandler(2)} /> 가사&nbsp;
        <input type="radio" name="release" checked={status === 3} onClick={(e) => radioHandler(3)} /> 동행&nbsp;
        </div>

        {status === 1 &&  
        <div style ={{display: 'flex', gap: '20px' }}>        
        <div style ={{width: '125vh', height: '140vh'}}>
        
        <br/>
        <Line data={data_c} options={options} plugins={ChartDataLabels}  /> 
        
        </div>           

        <div style= {{textAlign: 'left'}}>   
            <h4>선택일: {clickdata.date_at}</h4>
        <div style = {{textAlign: 'center'}}>
        <div className="ag-theme-alpine" style={{height: 490, width: 407}}>
            <AgGridReact
               rowData={row} columnDefs={colDefs}>
               
            </AgGridReact>
            </div>
        </div> 
        </div>
        </div>
        }


        {status === 2 &&  
        <div style ={{display: 'flex', gap: '20px' }}>        
        <div style ={{width: '125vh', height: '140vh'}}>
        
        <br/>
        <Line data={data_h} options={options} plugins={ChartDataLabels}  /> 
        
        </div>           

        <div style= {{textAlign: 'left'}}>   
            <h4>선택일: {clickdata.date_at}</h4>
        <div style = {{textAlign: 'center'}}>
        <div className="ag-theme-alpine" style={{height: 365, width: 407}}>
            <AgGridReact
               rowData={rows1} columnDefs={colDefs}>
               
            </AgGridReact>
            </div>
        </div>
        </div>
        </div> }

        {status === 3 &&  
        <div style ={{display: 'flex', gap: '20px' }}>        
        <div style ={{width: '125vh', height: '140vh'}}>
        
        <br/>
        <Line data={data_d} options={options} plugins={ChartDataLabels}  /> 
        
        </div>           

        <div style= {{textAlign: 'left'}}>   
            <h4>선택일: {clickdata.date_at}</h4>
        <div style = {{textAlign: 'center'}}>
        <div className="ag-theme-alpine" style={{height: 365, width: 407}}>
            <AgGridReact
               rowData={rows2} columnDefs={colDefs}>
               
            </AgGridReact>
            </div>
            </div>
            </div>
            </div> }

                     
        <br />
        <br />
            
        </div> 
    </>   
                
    );

  }

export default Chart2;