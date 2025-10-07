import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui'

function Filter() {
  return (
    <div className='flex items-center gap-2'>
    <div>Filter By: </div>
    <Select>
        <SelectTrigger>
            <SelectValue placeholder="-----" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="time_created">-----</SelectItem>
            <SelectItem value="time_updated">-----</SelectItem>
        </SelectContent>
    </Select>
</div>
  )
}

export { Filter }
