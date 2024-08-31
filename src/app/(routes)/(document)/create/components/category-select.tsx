import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { useCreateDocumentContext } from '../contexts/create-document-context'
import { CategoryDTO } from '@/apis/types/dto/category.dto'

interface Props {
  categories: CategoryDTO[]
}

export function CategorySelect({ categories }: Props) {
  const { selectedCategoryId, selectCategory } = useCreateDocumentContext()

  const defaultCategory = categories.find((category) => category.id === selectedCategoryId)

  return (
    <Select onValueChange={(value) => selectCategory(+value)}>
      <SelectTrigger className="center flex w-[180px] justify-center gap-[20px] border-none bg-inherit">
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
      <SelectContent defaultValue={selectedCategoryId}>
        {categories.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
              <div>{category.emoji}</div>
              <div>{category.name}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
