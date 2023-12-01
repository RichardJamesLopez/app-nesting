'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center">Health</div>
          <div className="flex items-center">
            <InfoOutlinedIcon sx={{ color: 'rgb(99 102 241)' }} />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">Time Period</div>
          <FormControl
            sx={{ minWidth: 120, padding: '1px', marginLeft: '6px' }}
          >
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ padding: '1px' }}
            >
              <MenuItem value="">This month</MenuItem>
              <MenuItem value={0}>This week</MenuItem>
              <MenuItem value={20}>Today</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Doughnut data={data} />
    </>
  );
}
