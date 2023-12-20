'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SelectChangeEvent } from '@mui/material/Select';

ChartJS.register(ArcElement, Tooltip, Legend);
import styles from 'styled-components';
const HeaderContainer = styles.div`
  display: flex;
   
  @media (max-width: 1500px) {
    display: block; 
  }
  @media (max-width: 768px) {
    display: flex; 
  } ;
`;
export default function Health() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const data = {
    labels: ['Active', 'Completed', 'Ended'],
    datasets: [
      {
        label: 'Health',
        data: [80, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <HeaderContainer className="block justify-between lg:flex">
        <div className="flex">
          <div className="mr-1 flex items-center text-lg font-bold">Health</div>
          <div className="flex items-center">
            <InfoOutlinedIcon sx={{ color: 'rgb(99 102 241)' }} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex w-36 items-center font-bold">Time Period</div>
          <select
            id="countries"
            className="block w-2/3 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="0">This month</option>
            <option value="1">This week</option>
            <option value="2">Today</option>
          </select>
        </div>
      </HeaderContainer>
      <Doughnut data={data} />
    </>
  );
}
