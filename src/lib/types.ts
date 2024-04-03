import { Expense, Sale } from '@prisma/client'

export type DataReponse = {
  sales: Sale[]
  expenses: Expense[]
}

export type DailyRecord = {
  date: string
  value: number
}

export type SalesMontly = {
  totalVendaPorDia: DailyRecord[]
  totalPix: number
  totalDinheiro: number
  totalDebito: number
  totalCredito: number
}

export type ExpenseMontly = {
  totalDespesaPorDia: DailyRecord[]
  totalDespesa: number
  totalRetirada: number
  totalPagamento: number
  totalVale: number
}

export type MonthlyResponse = {
  sales: SalesMontly
  expenses: ExpenseMontly
}
