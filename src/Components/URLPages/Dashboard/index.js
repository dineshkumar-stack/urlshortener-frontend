import React, { useEffect, useState } from 'react'
import { findPerDayCountApi } from '../../Api'
import { Bar } from 'react-chartjs-2';
import Header from '../../Header';
import "./chart.css";
import { useNavigate } from 'react-router-dom';

function BarChart() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const token = window.localStorage.getItem("token")
            const config = { headers: { "x-auth-token": token } }
            const response = await findPerDayCountApi(config)
            // console.log(response);
            setData(response.data.data)
        } catch (err) {
            console.log(err)
            if (err.response.data.message === "Invalid Authorization") {
                const confirmed = window.confirm("Please login to continue")
                if (confirmed) {
                    navigate("/login")
                } else {
                    navigate("/urlshortener")
                }
            }
        }
    }
    // console.log("check", data)
    const newData = [...data].sort((a, b) => new Date(a._id) - new Date(b._id))
    // console.log("newData", newData)

    const monthCount = data.reduce((accumlator, currentvalue) => accumlator + currentvalue.count, 0);
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = data.find((val) => val._id = today);
    const todayValue = todayCount ? todayCount.count : 0


    let chartData = {
        labels: newData.map((val) => val._id),
        datasets: [{
            label: "Count Perday",
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: newData.map((val) => val.count)
        }]
    }

    // chart option

    // const chartOptions = {
    //     response: true,
    //     maintainAspectRatio: false
    // }


    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Header></Header>
            <div className='analytics'>
                <p>This Month Created URL Count <span style={{ color: "green", padding: "0px 10px" }}>{monthCount}</span></p>
                <p>Today Created URL Count <span style={{ color: "Blue", padding: "0px 10px" }}>{todayValue}</span></p>
            </div>
            <div className="chart" >
                <div>BarChart</div>
                <Bar data={chartData} />
            </div>
        </div>

    )
}

export default BarChart