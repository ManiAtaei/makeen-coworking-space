import React from 'react';
import ReactECharts from 'echarts-for-react';

function LineChart() {
    const option = {
        grid: {
          left: '0%',
          right: '0%',
          top:"13%",
          containLabel: true
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
          max: 20000000,
          interval: 4000000,
          axisLabel: {
            formatter: (value) => value.toLocaleString(),
            fontFamily: "'x-regular', sans-serif",
            fontSize: 12,
          }
        },
        series: [
            {
              name: 'Line 2',
              type: 'line',
              stack: 'Total',
              data: [12000000, 10400000, 11000000, 11500000, 12500000, 13000000,12000000, 10400000, 11000000, 11500000, 12500000, 13000000],
              smooth: true,
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: {
                width: 2,
                color: '#44C0ED'
              },
              itemStyle: {
                color: '#fff',
                borderWidth: 2,
                borderColor: '#44C0ED'
              },
              areaStyle: {
                opacity: 2,
                color: '#C3EBF9'
              }
            },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            data: [4000000, 2000000, 3500000, 5500000, 7000000, 2000000,4000000, 2000000, 3500000, 5500000, 7000000, 2000000],
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 2,
              color: '#4073D0'
            },
            itemStyle: {
              color: '#fff',
              borderWidth: 2,
              borderColor: '#4073D0'
            },
            areaStyle: {
              opacity: 2,
              color: '#B3C7EC'
            }
          },
        ]
      };
    
      return (
        <div style={{ width: '100%', margin: '10px' }}>
          <ReactECharts 
            option={option}
            style={{ height: '300px', width: '100%' }}
          />
        </div>
      );
    }

export default LineChart;