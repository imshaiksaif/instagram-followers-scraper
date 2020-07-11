import React, { PureComponent } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default class Chart extends PureComponent {
  render() {
    const { data, dataKey } = this.props;
    const scrapesWithDates = data.map(scrape => ({
      ...scrape,
      date: formatDistanceToNow(scrape.date),
    }));
    return (
      <LineChart
        width={500}
        height={300}
        data={scrapesWithDates}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
