import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    }, 
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips :{
        mode: 'index',
        intersect: false,
        callbacks: {
            label : function(tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0.0')
            },
        }
    },
    scales: {
        xAxes: [
            {
              type: 'time',
              time:{
                  format: 'MM/DD/YY',
                  tooltipFormat: 'll',
              }
            }
          ],
      yAxes: [
        {
            gridLines: {
                display: false,
            },
          ticks: {
            callback: function(value , index, values){
                return numeral(value).format('0a')
            },
          },
        },
      ],
    }
  };

function LineGraph({casesType}) {
    const [data, setData] = useState({});

    console.log(casesType);
    const buildChartData = (data, caseType) => {
        console.log(data);
        let chartDataArr = [];
        let lastPointData;
        for (let date in data.cases) {
            if (lastPointData) {
                let newChartData = {
                    x: date,
                    y: data[caseType][date] - lastPointData,
                };
                chartDataArr.push(newChartData);
            }
            lastPointData = data[caseType][date];
        }
        return chartDataArr;
    }


    useEffect(() => {
        const gettingChartData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const chartData = buildChartData(data, casesType);
                    console.log(casesType , '====' , chartData);
                    setData(chartData);
                });
        }
        gettingChartData();
    }, [casesType]);

    return (
        <div className="linegraph">
            {data?.length > 0 && (
                <Line options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: 'rgba(240, 16, 52, 0.5)',
                                borderColor: '#CC1034',
                                data: data
                            }
                        ]
                    }} />
            )}
        </div>
    )
}
export default LineGraph;