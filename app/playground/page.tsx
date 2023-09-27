'use client';

import { Card, Metric, Title, Flex, Grid } from '@tremor/react';
import Chart from './chart';

const activities = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 },
];

const users = [
  { name: '/home', value: 12 },
  { name: '/imprint', value: 34 },
  { name: '/shop', value: 22 },
  { name: '/pricing', value: 56 },
];

const comments = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 },
];

const data = [
  {
    category: 'Activities',
    stat: '10,234',
    data: activities,
  },
  {
    category: 'Active Users',
    stat: '123',
    data: users,
  },
  {
    category: 'Comments',
    stat: '2,543',
    data: comments,
  },
];

export default function PlaygroundPage() {
  return (
    <main className="max-w-3m  mx-auto p-4">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>

            <Metric>{item.stat}</Metric>
          </Card>
        ))}
      </Grid>
      <Chart />
    </main>
  );
}
/*
<Flex
              justifyContent="center"
              alignItems="center"
              className="space-x-8"
            ></Flex>

*/
