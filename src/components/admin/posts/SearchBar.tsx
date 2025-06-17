"use client"
import { Input, Button } from '@/components/ui'
import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64"
      />
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
} 