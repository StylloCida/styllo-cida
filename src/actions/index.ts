'use server'

import { prisma } from '@/lib/prisma'
import { ExpenseSchema, SaleSchema } from '@/lib/schema'
import { ExpenseFormState, SaleFormState } from '@/lib/states'
import { Today } from '@/utils'
import { revalidatePath } from 'next/cache'

export async function newSale(
  formState: SaleFormState,
  formData: FormData,
): Promise<SaleFormState> {
  const parsed = SaleSchema.safeParse({
    value: formData.get('value'),
    category: formData.get('category'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  const clearedValue = clearNumber(parsed.data.value)

  await prisma.sale.create({
    data: {
      value: clearedValue,
      category: parsed.data.category,
      description: parsed.data.description,
      date: Today,
    },
  })

  revalidatePath('/')
  return { success: true, errors: {} }
}

export async function newExpense(
  formState: ExpenseFormState,
  formData: FormData,
): Promise<ExpenseFormState> {
  const parsed = ExpenseSchema.safeParse({
    value: formData.get('value'),
    category: formData.get('category'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  const clearedValue = clearNumber(parsed.data.value)

  await prisma.expense.create({
    data: {
      value: clearedValue,
      category: parsed.data.category,
      description: parsed.data.description,
      date: Today,
    },
  })

  revalidatePath('/')
  return { success: true, errors: {} }
}

export async function getDailyLogs() {
  const [sales, expenses] = await Promise.all([
    prisma.sale.findMany({ where: { date: Today } }),
    prisma.expense.findMany({ where: { date: Today } }),
  ])

  return { sales, expenses }
}

function clearNumber(value: string) {
  const cleared = parseFloat(
    value.replace('R$ ', '').replace('.', '').replace(',', '.'),
  )

  return cleared
}
