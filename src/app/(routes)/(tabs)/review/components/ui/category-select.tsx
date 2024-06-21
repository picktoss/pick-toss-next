import { CategoryDTO } from '@/apis/types/dto/category.dto'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  selectedCategoryId: number
  categories: CategoryDTO[]
  onValueChange: (categoryId: number) => void
}

export function CategorySelect({ selectedCategoryId, categories, onValueChange }: Props) {
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)!

  return (
    <Select
      onValueChange={(value) => onValueChange(+value)}
      defaultValue={String(selectedCategory.id)}
    >
      <SelectTrigger className="h-[20px] w-fit gap-[16px] border-none p-0 !text-body1-bold text-gray-08 outline-none">
        <SelectValue
          placeholder={
            <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
              <div>{selectedCategory?.emoji}</div>
              <div>{selectedCategory.name}</div>
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent defaultValue={selectedCategoryId}>
        {categories.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
              <div>{category?.emoji}</div>
              <div>{category.name}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
