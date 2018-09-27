import React, { Component } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

class Chart extends Component {
  render() {
    const { data } = this.props;

    // console.log(data[0].bid_price_EUR)

    const prices = {
      '200k-500k': 0,
      '500k-1M': 0,
      '1M-2M': 0,
      '3M-5M': 0,
      '5M-10M': 0,
      '+10M': 0,
    };
    data.forEach(element => {
      const eur = parseInt(element.tender_finalPrice_EUR, 10);

      if (eur < 200000) () => {}
      else if (eur < 500000) prices['200k-500k'] += 1;
      else if (eur < 1000000) prices['500k-1M'] += 1;
      else if (eur < 2000000) prices['1M-2M'] += 1;
      else if (eur < 5000000) prices['3M-5M'] += 1;
      else if (eur < 5000000) prices['5M-10M'] += 1;
      else if (eur >= 10000000) prices['+10M'] += 1;
    });


    const chartData = Object.keys(prices).map((key, index) => {
      return {
        name: key,
        count: prices[key],
      };
    });

    return (
      <BarChart width={400} height={300} data={chartData}>
        <Bar dataKey='count' fill='#8884d8' />
        <XAxis dataKey='name' />
        <YAxis />
      </BarChart>
    );
  }
}

export default Chart;
