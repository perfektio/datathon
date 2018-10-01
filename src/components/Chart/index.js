import React, { Component } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class Chart extends Component {
  createDataCompleteness(data) {
    const prices = {
      '0-40%': 0,
      '40-50%': 0,
      '50-60%': 0,
      '60-70%': 0,
      '+70%': 0,
    };
    data.forEach(procurement => {
      const per = 100 - this.dataCompletenessPercentage(procurement);

      if (per < 40) prices['0-40%'] += 1;
      else if (per <= 50) prices['40-50%'] += 1;
      else if (per <= 60) prices['50-60%'] += 1;
      else if (per <= 70) prices['60-70%'] += 1;
      else if (per > 70) prices['+70%'] += 1;
    });

    return Object.keys(prices).map((key, index) => {
      return {
        name: key,
        count: prices[key],
      };
    });
  }

  createYear(data) {
    const years = { };
    data.forEach(procurement => {
      let year = procurement.tender_publications_firstdContractAwardDate

      if (year) {
        year = year.split('-')[0]
      } else {
        year = 'N/A'
      }

      if (!years[year]) years[year] = 0;
      years[year] += 1;
    });

    const ready = Object.keys(years).map((key, index) => {
      return {
        name: key,
        count: years[key],
      };
    });

    return ready;
  }

  createBuyerTypes(data) {
    const years = { };
    data.forEach(procurement => {
      let year = procurement.buyer_buyerType

      if (year) {
        year = year.toLowerCase().replace("_", " ")
      } else {
        year = 'N/A'
      }

      if (!years[year]) years[year] = 0;
      years[year] += 1;
    });

    const ready = Object.keys(years).map((key, index) => {
      return {
        name: key,
        count: years[key],
      };
    });

    return ready.sort((a, b) => {
      if (a['name'] < b['name']) return -1;
      if (a['name'] > b['name']) return 1;
      return 0;
    });
  }

  createFinalPrice(data) {
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

      if (eur >= 200000 && eur < 500000) prices['200k-500k'] += 1;
      else if (eur < 1000000) prices['500k-1M'] += 1;
      else if (eur < 2000000) prices['1M-2M'] += 1;
      else if (eur < 5000000) prices['3M-5M'] += 1;
      else if (eur < 5000000) prices['5M-10M'] += 1;
      else if (eur >= 10000000) prices['+10M'] += 1;
    });

    return Object.keys(prices).map((key, index) => {
      return {
        name: key,
        count: prices[key],
      };
    });
  }


  dataCompletenessPercentage(procurement) {
    const notSpecialKeys = Object.keys(procurement).filter(key => !['bidders'].includes(key));

    return notSpecialKeys.reduce((total, key) => {
      if (typeof total === 'string') total = 1;
      const val = procurement[key];
      if (!val) return total;
      return total += 1
    });
  }

  render() {
    const { data, selected } = this.props;

    // console.log(data[0].bid_price_EUR)

    const chartData = {
      'final_price': this.createFinalPrice(data),
      'data_completeness': this.createDataCompleteness(data),
      'year': this.createYear(data),
      'buyer_types': this.createBuyerTypes(data),
    };

    return (
      <ResponsiveContainer width='100%' height={350}>
        <BarChart width={300} height={350} data={chartData[selected]}>
          <Bar dataKey='count' fill='#50E3C2' />
          <XAxis
            dataKey='name'
            interval={0}
            angle={-11}
            tick={{
              fontSize: 12,
            }}
          />
          <YAxis />
          <Tooltip cursor={false}/>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default Chart;
