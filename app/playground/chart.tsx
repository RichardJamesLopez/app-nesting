'use client';

import { Card, AreaChart, Divider } from '@tremor/react';
import { thumbsStyle } from 'styles/formStyles';

interface DataPoint {
  Month: string;
  'Income/Loss': number;
  'Appreciation/Depreciation': number;
}

const data: DataPoint[] = [];
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 4);

for (let i = 0; i < 48; i++) {
  const month = startDate.getMonth() + i;
  const year = startDate.getFullYear() + Math.floor(month / 12);
  const monthString = new Date(year, month % 12).toLocaleString('default', { month: 'short' });
  const date = `${monthString} ${year.toString().substring(2)}`;

  const income = Math.round(Math.random() * 0.35 * 10000000) - 1000000;
  const appreciationDepreciation = Math.round(Math.random() * 0.45 * 10000000) - 2500000;

  data.push({
    Month: date,
    'Income/Loss': income,
    'Appreciation/Depreciation': appreciationDepreciation,
  });
}

export default function Chart() {
  return (
    <Card>
      <Divider style={thumbsStyle}>Treasury Performance</Divider>

      <AreaChart
        className="mt-4 h-72"
        data={data}
        categories={['Income/Loss', 'Appreciation/Depreciation']}
        index="Month"
        colors={['blue', 'green']}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={110}
        stack={true}
        showAnimation={true}
      />
    </Card>
  );
}
