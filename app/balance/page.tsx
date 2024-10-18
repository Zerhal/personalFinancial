"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Balance() {
  const [balance, setBalance] = useState({ assets: 0, liabilities: 0 });

  useEffect(() => {
    const fetchBalance = async () => {
      const response = await fetch('/api/balance');
      const data = await response.json();
      setBalance(data);
    };

    fetchBalance();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Balance Sheet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${balance.assets.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${balance.liabilities.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Net Worth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${(balance.assets - balance.liabilities).toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}