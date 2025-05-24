"use client"
import { Input, Button } from '@/components/ui'
import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (search: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchContent, setSearchContent] = useState('');

  const handleSearch = () => {
    onSearch(searchContent);
  }
  
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Search Name" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export { SearchBar }
