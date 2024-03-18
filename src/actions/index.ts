'use server'

import { prisma } from '@/lib/prisma'
import { ExpenseSchema, SaleSchema } from '@/lib/schema'
import { ExpenseFormState, SaleFormState } from '@/lib/states'
import { Today } from '@/utils'
import { CategoryExpense, CategorySale } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function newSale(
  formState: SaleFormState,
  formData: FormData,
): Promise<SaleFormState> {
  const parsed = SaleSchema.safeParse({
    value: formData.get('value'),
    category: formData.get('category'),
    date: formData.get('date'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  const clearedValue = clearNumber(parsed.data.value)

  if (parsed.data.date) {
    const selectedDate = new Date(parsed.data.date)
    selectedDate.setHours(0, 0, 0, 0)

    await prisma.sale.create({
      data: {
        value: clearedValue,
        category: parsed.data.category,
        description: parsed.data.description,
        date: selectedDate,
      },
    })
  } else {
    await prisma.sale.create({
      data: {
        value: clearedValue,
        category: parsed.data.category,
        description: parsed.data.description,
        date: Today,
      },
    })
  }

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
    date: formData.get('date'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  const clearedValue = clearNumber(parsed.data.value)

  if (parsed.data.date) {
    const selectedDate = new Date(parsed.data.date)
    selectedDate.setHours(0, 0, 0, 0)

    await prisma.expense.create({
      data: {
        value: clearedValue,
        category: parsed.data.category,
        description: parsed.data.description,
        date: selectedDate,
      },
    })
  } else {
    await prisma.expense.create({
      data: {
        value: clearedValue,
        category: parsed.data.category,
        description: parsed.data.description,
        date: Today,
      },
    })
  }

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

export async function updateRecord(
  formState: SaleFormState,
  formData: FormData,
): Promise<SaleFormState> {
  const id = formData.get('id') as string
  const type = formData.get('type') as string
  const value = formData.get('value') as string
  const category = formData.get('category') as CategorySale | CategoryExpense
  const description = formData.get('description') as string

  const clearedValue = clearNumber(value)

  if (!value || !category) {
    return { success: false, errors: { value: [''], category: [''] } }
  }

  if (id && type === 'sale') {
    const categorySale = category as CategorySale
    await prisma.sale.update({
      where: { id },
      data: {
        value: clearedValue,
        category: categorySale,
        description,
      },
    })
    revalidatePath('/')
  } else if (id && type === 'expense') {
    const categoryExpense = category as CategoryExpense
    await prisma.expense.update({
      where: { id },
      data: {
        value: clearedValue,
        category: categoryExpense,
        description,
      },
    })
    revalidatePath('/')
  }

  redirect('/')
}

export async function deleteRecord(id: string, category: 'sale' | 'expense') {
  if (category === 'sale') {
    await prisma.sale.delete({
      where: { id },
    })
  }

  if (category === 'expense') {
    await prisma.expense.delete({
      where: { id },
    })
  }

  revalidatePath('/')
  redirect('/')
}

export async function revalidateCache() {
  return revalidatePath('/')
}
