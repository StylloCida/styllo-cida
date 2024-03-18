import { z } from 'zod'

export const SaleSchema = z.object({
  id: z.string().cuid().optional().nullable(),
  value: z.string().min(1, 'Informe o valor da venda'),
  category: z.enum(['DINHEIRO', 'PIX', 'DEBITO', 'CREDITO', 'CREDILOJA']),
  date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

export const ExpenseSchema = z.object({
  id: z.string().cuid().optional().nullable(),
  value: z.string().min(1, 'Informe o valor da despesa'),
  category: z.enum(['DESPESA', 'RETIRADA', 'PAGAMENTO', 'VALE']),
  date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})
