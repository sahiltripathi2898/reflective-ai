import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'IN',
          data: [3, 6, 6, 6, 2, 4, 3],
        },
        {
          name: 'OUT',
          data: [0, 0, 2, 5, 8, 9, 8],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [
            '9 AM',
            '10 AM',
            '11 AM',
            '12 PM',
            '1 PM',
            '2 PM',
            '4 PM',
          ],
        },
        yaxis: {
          title: {
            text: 'Number of persons',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return 'Person : ' + val;
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" style={{ marginTop: '50px' }}>
        <div style={{ padding: '20px', fontSize: '2rem' }}>
          Graphical Representation
        </div>
        <Paper
          elevation={6}
          style={{
            height: '440px',
            position: 'relative',
            width: '90%',
            borderRadius: '10px',
            marginLeft: '20px',
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

export default ApexChart;
