import React from "react";
import Card from "./Card";
import DatePicker from 'react-datepicker';
import {useState} from 'react';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date().setYear(2024-1));
    const [endDate, setEndDate] = useState(new Date().setYear(2024));


    return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand">
        <div className="col-span-1 md:col-span-2 xl:col-span-2 row-span-1">
            <Card>

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
        minDate={new Date("2022-01-13")}
        maxDate={new Date("2024-09-25")}
        onChange ={date => setEndDate(date)}
        dateFormat="yyyy-MM-dd"/>
         </span>
        
        </div>
            </Card>
        </div>
        <div className="md:col-span-2 row-span-5">
            <Card>Chart</Card>
        </div>
        <div>
            <Card>Overview</Card>
        </div>
        <div className="row-span-2 xl:row-span-4">
            <Card>Details</Card>
        </div>

    </div>
    );
};

export default Dashboard;