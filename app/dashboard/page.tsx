"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const balanceRes = await fetch('/api/balance');
      const balanceData = await balanceRes.json();
      setBalance(balanceData.assets - balanceData.liabilities);

      const resultRes = await fetch('/api/result');
      const resultData = await resultRes.json();
      setIncome(resultData.totalIncome);
      setExpenses(resultData.totalExpenses);

      // Prepare data for pie chart
      const labels = Object.keys(resultData.expensesByCategory);
      const data = Object.values(resultData.expensesByCategory);
      const backgroundColor = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ];

      setCategoryData({
        labels,
        datasets: [
          {
            data,
            backgroundColor,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${income.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${expenses.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}