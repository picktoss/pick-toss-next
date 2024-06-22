export interface KeyPointDTO {
  id: number
  question: string
  answer: string
  bookmark: boolean
  category: {
    id: number
    name: string
  }
  document: {
    id: number
    name: string
  }
  updatedAt: Date
}
