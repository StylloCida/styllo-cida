'use client'

import { DataReponse } from '@/lib/types'
import { Months, currencyBRL } from '@/utils'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { Expense, Sale } from '@prisma/client'
import { useState } from 'react'

export default function Record() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [sales, setSales] = useState<Sale[] | null>(null)
  const [expenses, setExpenses] = useState<Expense[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchDate, setSearchDate] = useState('')
  const [totalSales, setTotalSales] = useState('')
  const [totalExpenses, setTotalExpenses] = useState('')

  async function handleSearch() {
    const searchDay = Number(day)

    if (isNaN(searchDay) || searchDay <= 0 || searchDay > 31 || !month) {
      return alert('Formato de Data inválido')
    }

    setLoading(true)

    try {
      const response = await fetch(
        `/api/relatorio-diario?dia=${day}&mes=${month}`,
        { next: { revalidate: 600 }, cache: 'no-cache' },
      )
      if (!response.ok) {
        return alert('Erro ao obter dados')
      }

      const data: DataReponse = await response.json()
      const { sales, expenses } = data
      setSales(sales)
      setExpenses(expenses)
      setSearchDate(
        new Date(2024, Number(month) - 1, searchDay).toLocaleDateString(
          'pt-br',
          {
            day: '2-digit',
            month: 'long',
          },
        ),
      )
      setTotalSales(
        sales
          .reduce((acc, item) => acc + item.value, 0)
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      )
      setTotalExpenses(
        expenses
          .reduce((acc, item) => acc + item.value, 0)
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      )
    } catch (error) {
      alert('Erro ao buscar dados. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <div className="my-3 flex space-x-3">
          <Input
            label="Dia"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <Select
            placeholder="Escolha o mês"
            label="Mês"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Months.map((month) => (
              <SelectItem key={month.key}>{month.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Button
          onClick={handleSearch}
          className="my-4 w-full"
          variant="faded"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Buscar'}
        </Button>
      </div>

      {sales && expenses && (
        <div className="text-white">
          <h1 className="my-5 text-center text-lg">Relatório {searchDate}</h1>

          <h2 className="my-2 text-xl italic text-neutral-500">Vendas</h2>
          {sales.length ? (
            <div className="grid grid-cols-3">
              <div className="col-span-3 border-t-2" />
              <span className="font-medium">Valor</span>
              <span className="font-medium">Forma de Pag.</span>
              <span className="font-medium">Descrição</span>
              <div className="col-span-3 mb-2 border-t-2" />
              {sales.map((sale) => (
                <>
                  <span>{currencyBRL(sale.value)}</span>
                  <span>{sale.category}</span>
                  <span>{sale.description}</span>
                </>
              ))}
              <p className="col-span-3 text-end">Total: {totalSales}</p>
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Não há registro de Vendas.
            </p>
          )}

          <h2 className="my-2 text-xl italic text-neutral-500">Despesas</h2>
          {expenses.length ? (
            <div className="grid grid-cols-3">
              <div className="col-span-3 border-t-2" />
              <span className="font-medium">Valor</span>
              <span className="font-medium">Categoria</span>
              <span className="font-medium">Descrição</span>
              <div className="col-span-3 mb-2 border-t-2" />
              {expenses.map((expense) => (
                <>
                  <span>{currencyBRL(expense.value)}</span>
                  <span>{expense.category}</span>
                  <span>{expense.description}</span>
                </>
              ))}
              <p className="col-span-3 text-end">Total: {totalExpenses}</p>
            </div>
          ) : (
            <p className="text-sm text-neutral-500">
              Não há registro de Despesas.
            </p>
          )}
        </div>
      )}
    </>
  )
}
