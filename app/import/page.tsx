"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"

export default function ImportCSV() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "CSV file imported successfully",
        })
      } else {
        throw new Error('Failed to import CSV');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import CSV file",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Import CSV</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input type="file" accept=".csv" {...register('file', { required: true })} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Importing...' : 'Import CSV'}
        </Button>
      </form>
    </div>
  );
}