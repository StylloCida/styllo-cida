import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const day = Number(searchParams.get('dia'))
  const month = Number(searchParams.get('mes')) - 1

  const searchDate = new Date(2024, month, day)

  const [sales, expenses] = await Promise.all([
    prisma.sale.findMany({
      where: { date: searchDate },
      orderBy: { date: 'desc' },
    }),
    prisma.expense.findMany({
      where: { date: searchDate },
      orderBy: { date: 'desc' },
    }),
  ])

  return Response.json({ sales, expenses })
}
