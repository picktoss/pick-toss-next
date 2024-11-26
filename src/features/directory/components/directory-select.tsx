import { Select, SelectContent, SelectItem, SelectTrigger } from '@/shared/components/ui/select'

interface Props {
  directories: Directory.Item[]
  selectedDirectoryId: number | null
  selectDirectoryId: (directoryId: number) => void
}

const DirectorySelect = ({ directories, selectedDirectoryId, selectDirectoryId }: Props) => {
  const curDirectory = directories.find((directory) => directory.id === selectedDirectoryId)

  return (
    <Select
      defaultValue={String(curDirectory?.id)}
      onValueChange={(value) => selectDirectoryId(Number(value))}
    >
      <SelectTrigger className="flex w-fit items-center gap-2 border-none px-0 outline-none">
        <span>{curDirectory?.emoji ?? '📁'}</span>
        <span>{curDirectory?.name}</span>
      </SelectTrigger>
      <SelectContent className="rounded-[8px] bg-white">
        {directories.map((directory) => (
          <SelectItem key={directory.id} value={String(directory.id)}>
            <div className="flex gap-2">
              <span>{directory.emoji ?? '📁'}</span>
              <span>{directory.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default DirectorySelect
