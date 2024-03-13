import { z } from 'zod'

export const SaleSchema = z.object({
  value: z.string().min(1, 'Informe o valor da venda'),
  category: z.enum(['DINHEIRO', 'PIX', 'DEBITO', 'CREDITO', 'CREDILOJA']),
  description: z.string().optional().nullable(),
})

export const ExpenseSchema = z.object({
  value: z.string().min(1, 'Informe o valor da despesa'),
  category: z.enum(['DESPESA', 'RETIRADA', 'PAGAMENTO', 'VALE']),
  description: z.string().optional().nullable(),
})
