"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Result() {
  const [result, setResult] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    incomeByCategory: {},
    expensesByCategory: {},
  });

  useEffect(() => {
    const fetchResult = async () => {
      const response = await fetch('/api/result');
      const data = await response.json();
      setResult(data);
    };

    fetchResult();
  }, []);

  const chartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [result.totalIncome, result.totalExpenses],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Income Statement</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${result.totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${result.totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Net Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${(result.totalIncome - result.totalExpenses).toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}