export type ReadingStatus = 'Reading' | 'Finished' | 'Have not started' | 'Later' | 'Postponed'

export interface Book {
  id: string
  title: string
  author: string
  status: ReadingStatus
  color: string
  recommendedBy?: string
  summary?: string
  link?: string
  googleBooksId?: string
  pages?: number
  coverUrl?: string
}
