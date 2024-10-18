import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Personal Finance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dashboard">
          <Button className="w-full h-32 text-xl">Dashboard</Button>
        </Link>
        <Link href="/import">
          <Button className="w-full h-32 text-xl">Import CSV</Button>
        </Link>
        <Link href="/transactions">
          <Button className="w-full h-32 text-xl">Transactions</Button>
        </Link>
        <Link href="/balance">
          <Button className="w-full h-32 text-xl">Balance Sheet</Button>
        </Link>
        <Link href="/result">
          <Button className="w-full h-32 text-xl">Income Statement</Button>
        </Link>
      </div>
    </div>
  );
}