import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function ChartBar() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          let tooltipContent = '';
          params.forEach(param => {
            tooltipContent += `<br/>${param.seriesName}: ${param.value}%`;
          });
          return tooltipContent;
        }
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
          fontFamily: "'x-regular', sans-serif",
          fontSize: 10,
          
        },
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: (value) => value.toLocaleString(),
          fontFamily: "'x-regular', sans-serif",
          fontSize: 12,
        }
      },
      series: [
        {
          name: " اتاق جلسات ",
          type: "bar",
          stack: "total",
          data: [20, 30, 40, 50, 30, 75, 65, 30, 45, 51, 20, 35],
          itemStyle: {
            color: "#69CDF1",
            borderRadius: [0, 0, 0, 0],
          },
        },
        {
          name: " صندلی اشتراکی ",
          type: "bar",
          stack: "total",
          data: [20, 30, 40, 20, 30, 20, 30, 20, 15, 32, 60, 30],
          itemStyle: {
            color: "#668FD9",
            borderRadius: [4.54, 4.54, 0, 0],
          },
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "300px", maxWidth: "100%", margin:"-10px" }}
    />
  );
}
