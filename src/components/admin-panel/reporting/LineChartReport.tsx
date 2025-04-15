import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

function LineChartReport() {
  
  const [chartLine , setChartLine] = useState([])

  useEffect(() => {
    const data = async () => {
      try {
        const respons = await axios.get(
          "https://109.230.200.230:7890/api/v1/Admins/Daily-Income",
          {
            withCredentials: true,
          }
        );
        console.log(respons.data);
        setChartLine(respons.data)
      } catch (error) {
        console.log(error);
      }
    };
    data()
  } , []);

  const option = {
    grid: {
      left: "0%",
      right: "0%",
      top: "5%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
      axisLabel: {
        interval: 0,
        formatter: function (value, index) {
          return index % 2 === 0 ? value : "";
        },
        fontFamily: "'x-medium', sans-serif",
        fontSize: 14,
        color: "#606060",
      },
      axisTick: {
        alignWithLabel: true,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 20000000,
      interval: 4000000,
      axisLabel: {
        formatter: (value) => value.toLocaleString(),
        fontFamily: "'x-regular', sans-serif",
        fontSize: 14,
        color: "#404040",
      },
    },
    series: [
      {
        name: "Line 2",
        type: "line",
        stack: "Total",
        data: chartLine,
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: "#44C0ED",
        },
        itemStyle: {
          color: "#fff",
          borderWidth: 2,
          borderColor: "#44C0ED",
        },
        areaStyle: {
          opacity: 2,
          color: "#C3EBF9",
        },
      },
      {
        name: "Line 3",
        type: "line",
        stack: "Total",
        data: [
          4000000, 2000000, 3500000, 5500000, 7000000, 2000000, 4000000,
          2000000, 3500000, 5500000, 7000000, 2000000,
        ],
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: "#4073D0",
        },
        itemStyle: {
          color: "#fff",
          borderWidth: 2,
          borderColor: "#4073D0",
        },
        areaStyle: {
          opacity: 2,
          color: "#B3C7EC",
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", margin: "10px" }}>
      <ReactECharts
        option={option}
        style={{ height: "380px", width: "100%" }}
      />
    </div>
  );
}

export default LineChartReport;
