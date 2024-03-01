import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
  const chartRef = useRef<any>(null);

  const data = {
    labels: ['Active', 'Returned', 'Inactive'],
    datasets: [
      {
        label: '% of Users',
        data: [16, 14,60],
        backgroundColor: [
          'rgba(171,223,223)',
          'rgba(255,230,174)',
          'rgba(255, 166, 166)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(171,223,223)',
          'rgba(255,230,174)',
          'rgba(255, 166, 166)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance && chartRef.current.chartInstance.options) { 
      const chartInstance = chartRef.current.chartInstance;
      const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0);
      const active = data.datasets[0].data[0];
      const percentage = ((active / total) * 100).toFixed(2);

      chartInstance.options.plugins.title.text = `${percentage}%`;
      chartInstance.update();
    }
  }, [data]);

  return (
    <>
      <HeaderContainer className="block justify-between lg:flex">
        <div className="flex">
          <div className="mr-1 flex items-center text-lg font-bold">Community Health</div>
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
      <Doughnut ref={chartRef} data={data} options={{ plugins: { title: { display: true, text: '', font: { size: 20 } } } }} />
    </>
  );
}

