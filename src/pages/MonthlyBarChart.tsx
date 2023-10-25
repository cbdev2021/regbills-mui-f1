import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface MonthlyBarChartProps {
  data: { month: string; total: number }[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data }) => {
  return (
    <BarChart
      xAxis={[
        {
          scaleType: 'band',
          data: data.map((item) => item.month),
        },
      ]}
      series={[
        {
          data: data.map((item) => item.total),
        }
      ]}
      width={500}
      height={300}
    />
  );
}

export default MonthlyBarChart;
