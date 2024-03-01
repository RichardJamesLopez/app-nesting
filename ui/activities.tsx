import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, ChartOptions } from 'chart.js';
import styles from 'styled-components';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarController,
  BarElement
);

export const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      beginAtZero: true,
      stacked: true,
    },
  },
};

const getPast30Days = () => {
  const result = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.unshift(`${d.getMonth() + 1} ${d.getDate()}`);
  }
  return result;
};

const labels = getPast30Days();

const HeaderContainer = styles.div`
  display: flex;
   
  @media (max-width: 1500px) {
    display: block; 
  }
  @media (max-width: 768px) {
    display: flex; 
  } ;
`;

export const data = {
  labels,
  datasets: [
    {
      label: 'Updates',
      data: Array(30).fill(null).map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Comments',
      data: Array(30).fill(null).map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Shares',
      data: Array(30).fill(null).map(() => Math.floor(Math.random() * 100)),
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
  ],
};

export default function Leaderboard() {
  return (
    <div>
      <HeaderContainer className="block justify-between lg:flex">
        <div className="flex">
          <div className="mr-1 flex items-center text-lg font-bold">
            Activities
          </div>
        </div>
      </HeaderContainer>

      <Bar options={options} data={data} />
    </div>
  );
}
