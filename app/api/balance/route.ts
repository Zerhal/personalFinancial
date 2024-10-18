import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();

    const assets = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const liabilities = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return NextResponse.json({ assets, liabilities });
  } catch (error) {
    console.error('Error calculating balance:', error);
    return NextResponse.json({ error: 'Failed to calculate balance' }, { status: 500 });
  }
}