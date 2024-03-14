import { Expense, Sale } from '@prisma/client'

export type DataReponse = {
  sales: Sale[]
  expenses: Expense[]
}
