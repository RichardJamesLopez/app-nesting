'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';
import {
  formHeaderStyle,
  inputStyleSubmitted,
  thumbsStyle,
  contentInputStyleSubmitted,
} from 'styles/formStyles';

const data = [
  {
    Month: 'Jan 21',
    Income: 2890,
    Appreciation_Depreciation: 440,
  },
  {
    Month: 'Feb 21',
    Income: 2390,
    Appreciation_Depreciation: 1222,
  },
  {
    Month: 'Jan 22',
    Income: 2290,
    Appreciation_Depreciation: 711,
  },
];

export default function Chart() {
  return (
    <Card className="mt-8">
      <Title style={thumbsStyle}>Treasury Performance</Title>

      <AreaChart
        className="mt-8 h-80"
        data={data}
        categories={['Income', 'Appreciation_Depreciation']}
        index="Month"
        colors={['blue', 'neutral']}
        valueFormatter={(number: number) =>
          `$ ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
