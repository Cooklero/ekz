import React from 'react';
import Chart from "react-apexcharts";
class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['1 уровень', '2 уровень', '3 уровень', '4 уровень', '5 уровень', '6 уровень'],
      },
      series: [44, 55, 13, 43, 22,21],
    };
  }

  render() {
    return (
      <div className="pie-chart">
        <Chart className="Pie-chart"  options={this.state.options} series={this.state.series} type="pie"/>
      </div>
    );
  }
}

export default PieChart;
