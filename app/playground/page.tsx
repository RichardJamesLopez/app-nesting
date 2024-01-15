'use client';

import { Card, Metric, Title, Flex, Grid } from '@tremor/react';
import Chart from './chart';
import { useEffect, useState } from 'react';

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

export default function PlaygroundPage() {
  const [activeData, setActiveData] = useState([
    {
      category: 'Activities',
      stat: 15,
      data: activities,
    },
    {
      category: 'Active Users',
      stat: 0,
      data: users,
    },
    {
      category: 'Comments',
      stat: 0,
      data: comments,
    },
  ]);

  const getUsers = async (timePeriod: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/get?timePeriod=${timePeriod}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();

      const allUsers = data.allUsers;
      setActiveData((prevData) => [
        ...prevData.slice(0, 1),
        { ...prevData[1], stat: allUsers.length },
        ...prevData.slice(2),
      ]);

      return data;
    } catch (error) {
      console.error('Get Users Failed!', error);
    }
  };

  const getPosts = async (timePeriod: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/get?timePeriod=${timePeriod}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      const allPosts = data.allPosts;
      setActiveData((prevData) => [
        ...prevData.slice(0, 2),
        { ...prevData[2], stat: allPosts.length },
      ]);

      return data;
    } catch (error) {
      console.error('Get Posts Failed!', error);
    }
  };

  const handleTimePeriodChange = async (event: { target: { value: any } }) => {
    const selectedTimePeriod = event.target.value;

    try {
      const users = await getUsers(selectedTimePeriod);
      const posts = await getPosts(selectedTimePeriod);
    } catch (error) {
      console.error('Error fetching data!', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch initial data (you can fetch the default time period data here if needed)
        const users = await getUsers(0);
        const posts = await getPosts(0);
      } catch (error) {
        console.error('Error fetching data!', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <div className="flex w-28 items-center">Time Period</div>
        <select
          id="timePeriod"
          className="block w-36 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={handleTimePeriodChange}
        >
          <option value="1">Last 24 hours</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>
      <main className="max-w-3m  mx-auto p-4">
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {activeData.map((item) => (
            <Card key={item.category}>
              <Title>{item.category}</Title>

              <Metric>{item.stat}</Metric>
            </Card>
          ))}
        </Grid>
        <Chart />
      </main>
    </>
  );
}
