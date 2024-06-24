import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export type SearchFormSubmitType = (data: { term: string }) => void

interface Props {
  onSubmit: SearchFormSubmitType
  placeholder?: string
  defaultValue?: string
  className?: HTMLDivElement['className']
}

const formSchema = z.object({
  term: z.string(),
})

export function SearchForm({ placeholder, defaultValue, onSubmit, className }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: defaultValue,
    },
  })

  return (
    <div className={cn('w-full', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative h-[40px] w-full">
                    <SearchIcon className="absolute bottom-1/2 left-[13px] translate-y-1/2" />
                    <Input
                      className="rounded-[24px] border-none bg-gray-02 pl-[41px] pr-[43px]"
                      placeholder={placeholder}
                      {...field}
                    />
                    <div role="button" onClick={() => form.setValue('term', '')}>
                      <XIcon className="absolute bottom-1/2 right-[7px] translate-y-1/2" />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

function SearchIcon({ className }: { className?: HTMLElement['className'] }) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 6.97136C0 10.5395 2.88709 13.4427 6.43548 13.4427C7.83869 13.4427 9.12096 12.9886 10.1774 12.2263L14.1452 16.2243C14.3306 16.4108 14.5726 16.5 14.8307 16.5C15.3791 16.5 15.758 16.0864 15.758 15.5431C15.758 15.2836 15.6613 15.0484 15.4919 14.8781L11.5484 10.8882C12.379 9.80156 12.871 8.4473 12.871 6.97136C12.871 3.40319 9.98386 0.5 6.43548 0.5C2.88709 0.5 0 3.40319 0 6.97136ZM1.37903 6.97136C1.37903 4.16549 3.64516 1.88672 6.43548 1.88672C9.22577 1.88672 11.4919 4.16549 11.4919 6.97136C11.4919 9.77721 9.22577 12.056 6.43548 12.056C3.64516 12.056 1.37903 9.77721 1.37903 6.97136Z"
        fill="#A2A6AB"
      />
    </svg>
  )
}

function XIcon({ className }: { className?: HTMLElement['className'] }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="#D2D6DB" />
      <path d="M8 8L16 16" stroke="#A2A6AB" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8L8 16" stroke="#A2A6AB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
