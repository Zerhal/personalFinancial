import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const csvContent = await file.text();
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  try {
    const transactions = records.map((record: any) => ({
      description: record.description,
      amount: parseFloat(record.amount),
      date: new Date(record.date),
      type: record.type,
      category: record.category,
    }));

    await prisma.transaction.createMany({
      data: transactions,
    });

    return NextResponse.json({ message: 'CSV imported successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error importing CSV:', error);
    return NextResponse.json({ error: 'Failed to import CSV' }, { status: 500 });
  }
}