import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

class Chartvert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Electrical',
          data: [3, 4, 0],
        },
        {
          name: 'HVAC',
          data: [4, 6, 2],
        },
        {
          name: 'Painting',
          data: [3, 3, 2],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        title: {
          text: 'Floor wise analysis',
        },
        xaxis: {
          categories: ['Floor 7', 'Floor 6', 'Floor 5'],
          labels: {
            formatter: function (val) {
              return val + 'K';
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" style={{ marginTop: '50px' }}>
        <Paper
          elevation={6}
          style={{
            height: '440px',
            position: 'relative',
            width: '90%',
            marginLeft: '20px',
            borderRadius: '10px',
          }}
        >
          <Container
            fixed
            style={{ width: '100%', marginTop: '50px', position: 'absolute' }}
          >
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={350}
            />
          </Container>
        </Paper>
      </div>
    );
  }
}

export default Chartvert;
