'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { CategoryDTO } from '@/apis/types/dto/category.dto'
import { useState } from 'react'

interface Props {
  categories: CategoryDTO[]
}

export function CategorySelect({ categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0].id)

  const defaultCategory = categories[0]

  return (
    <Select>
      <SelectTrigger className="w-fit gap-[16px] border-none bg-inherit !px-0">
        <SelectValue
          placeholder={
            <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
              <div>{defaultCategory?.emoji}</div>
              <div>{defaultCategory?.name}</div>
            </div>
          }
          className=""
        />
      </SelectTrigger>
      <SelectContent
        defaultValue={selectedCategoryId}
        onChange={(value) => {
          setSelectedCategoryId(+value)
        }}
      >
        {categories.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            <div className="flex items-center gap-[8px] p-0 text-body1-bold text-gray-09">
              <div>{category.emoji}</div>
              <div>{category.name}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
