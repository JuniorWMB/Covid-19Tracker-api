import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
      .then((response) => response.json())
      .then((data) => {
        console.log("LINE GRAPH HERE", data);
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h1>Im a graph</h1>
      <Line
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204,16,52,0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
        options
      />
    </div>
  );
}

export default LineGraph;
