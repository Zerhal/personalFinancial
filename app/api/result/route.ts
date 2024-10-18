import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();

    const totalIncome = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeByCategory = transactions
      .filter((t) => t.type === 'Income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const expensesByCategory = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      incomeByCategory,
      expensesByCategory,
    });
  } catch (error) {
    console.error('Error calculating result:', error);
    return NextResponse.json({ error: 'Failed to calculate result' }, { status: 500 });
  }
}