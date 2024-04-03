import { prisma } from '@/lib/prisma'
import { DailyRecord } from '@/lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const initialMonth = Number(searchParams.get('de')) - 1
  let finalMonth = Number(searchParams.get('ate'))
  finalMonth = finalMonth || initialMonth + 1

  if (!initialMonth) return

  const firstDay = new Date(2024, initialMonth, 1)
  const lastDay = new Date(2024, finalMonth, 1)

  const [sales, expenses] = await Promise.all([
    prisma.sale.findMany({
      where: { date: { gte: firstDay, lt: lastDay } },
      orderBy: { date: 'asc' },
    }),
    prisma.expense.findMany({
      where: { date: { gte: firstDay, lt: lastDay } },
      orderBy: { date: 'asc' },
    }),
  ])

  let totalPix = 0
  let totalDinheiro = 0
  let totalDebito = 0
  let totalCredito = 0

  sales.forEach((sale) => {
    switch (sale.category) {
      case 'PIX':
        totalPix += sale.value
        break
      case 'DINHEIRO':
        totalDinheiro += sale.value
        break
      case 'DEBITO':
        totalDebito += sale.value
        break
      case 'CREDITO':
        totalCredito += sale.value
        break
      default:
        break
    }
  })

  let totalDespesa = 0
  let totalRetirada = 0
  let totalPagamento = 0
  let totalVale = 0

  expenses.forEach((expense) => {
    switch (expense.category) {
      case 'DESPESA':
        totalDespesa += expense.value
        break
      case 'RETIRADA':
        totalRetirada += expense.value
        break
      case 'PAGAMENTO':
        totalPagamento += expense.value
        break
      case 'VALE':
        totalVale += expense.value
        break
      default:
        break
    }
  })

  const totalVendaPorDia: DailyRecord[] = []

  const saleReduce = sales.reduce((group: Record<string, number>, sale) => {
    const date = sale.date.toISOString().slice(0, 10)

    if (group[date]) {
      group[date] += sale.value
    } else {
      group[date] = sale.value
    }

    return group
  }, {})

  Object.entries(saleReduce).map((obj) =>
    totalVendaPorDia.push({ date: obj[0], value: obj[1] }),
  )

  const totalDespesaPorDia: DailyRecord[] = []

  const expenseReduce = expenses.reduce(
    (group: Record<string, number>, expense) => {
      const date = expense.date.toISOString().slice(0, 10)

      if (group[date]) {
        group[date] += expense.value
      } else {
        group[date] = expense.value
      }

      return group
    },
    {},
  )

  Object.entries(expenseReduce).map((obj) =>
    totalDespesaPorDia.push({ date: obj[0], value: obj[1] }),
  )

  return Response.json({
    sales: {
      totalVendaPorDia,
      totalPix,
      totalDinheiro,
      totalDebito,
      totalCredito,
    },
    expenses: {
      totalDespesaPorDia,
      totalDespesa,
      totalRetirada,
      totalPagamento,
      totalVale,
    },
  })
}
