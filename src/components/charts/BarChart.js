import React from 'react';
import Chart from 'react-apexcharts';

class StackedBarChartWithScrollbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          tickPlacement: 'on',
          categories: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек','Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек',],
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        }
        
      },
      series: [
        { name: 'ур1', data: [30, 40, 45, 50, 49, 60, 70, 21, 12, 13, 42, 50,30, 40, 45, 50, 49, 60, 70, 91, 115, 130, 142, 150] },
        { name: 'ур2', data: [20, 21, 90, 42, 90, 17, 12, 22, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90] },
        { name: 'ур3', data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
        { name: 'ур4', data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 28, 10, 28, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
        { name: 'ур5', data: [10, 10, 10,28, 10, 28, 10, 10, 128, 20, 28, 10, 28, 10, 10, 28, 10, 10, 10, 10, 10, 10, 10, 10] },
        { name: 'ур6', data: [10, 10, 10, 28, 10, 28, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
      ],
    };
  }

  render() {
    return (
      <div>
        <Chart className="Chart" options={this.state.options} series={this.state.series} type="bar"  />
      </div>
    );
  }
}

export default StackedBarChartWithScrollbar;
