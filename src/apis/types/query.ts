import { UseQueryOptions } from '@tanstack/react-query'

export type QueryOptions = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
