'use client'

import { ExpenseMontly, MonthlyResponse, SalesMontly } from '@/lib/types'
import {
  Months,
  commissionCalc,
  currencyBRL,
  formateDate,
  selectedMonth,
} from '@/utils'
import { Button, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'

export default function RecordMonth() {
  const [initialMonth, setInitialMonth] = useState('')
  const [finalMonth, setFinalMonth] = useState('')
  const [sales, setSales] = useState<SalesMontly | null>(null)
  const [expenses, setExpenses] = useState<ExpenseMontly | null>(null)
  const [loading, setLoading] = useState(false)
  const [totalSales, setTotalSales] = useState('')
  const [totalExpenses, setTotalExpenses] = useState('')
  const [range, setRange] = useState('')

  async function handleSearch() {
    if (!initialMonth) return alert('Selecione o mês inicial')
    if (finalMonth && finalMonth < initialMonth) {
      return alert('A data inicial deve ser menor que a data final')
    }

    setLoading(true)

    try {
      const response = await fetch(
        `/api/relatorio-mensal?de=${initialMonth}&ate=${finalMonth}`,
        { next: { revalidate: 600 }, cache: 'no-cache' },
      )
      if (!response.ok) {
        return alert('Erro ao obter dados')
      }

      const data: MonthlyResponse = await response.json()
      const { sales, expenses } = data
      setSales(sales)
      setExpenses(expenses)
      setRange(selectedMonth(initialMonth, finalMonth))
      setTotalSales(
        sales.totalVendaPorDia
          .reduce((acc, item) => acc + item.value, 0)
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
      )
      setTotalExpenses(
        expenses.totalDespesaPorDia
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
          <Select
            placeholder="Mês inicial"
            label="De:"
            name="initialMonth"
            value={initialMonth}
            onChange={(e) => setInitialMonth(e.target.value)}
          >
            {Months.map((month) => (
              <SelectItem key={month.key}>{month.label}</SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Mês final (opcional)"
            label="Até:"
            name="finalMonth"
            value={finalMonth}
            onChange={(e) => setFinalMonth(e.target.value)}
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
          <h1 className="my-5 text-center text-lg">
            Relatório Mensal - {range}
          </h1>

          <h2 className="my-2 text-2xl italic text-neutral-500">Entrada</h2>
          <div className="grid grid-cols-2 text-white">
            <div className="col-span-2 border-t-2" />
            <span className="font-medium">Data</span>
            <span className="font-medium">Total</span>
            <div className="col-span-2 mb-2 border-t-2" />
            {sales.totalVendaPorDia.map((sale) => (
              <React.Fragment key={sale.date}>
                <p>{formateDate(sale.date)}</p>
                <p>{currencyBRL(sale.value)}</p>
              </React.Fragment>
            ))}
            <div className="col-span-2 mt-5 border-t-2" />
            <span className="font-medium">Forma de Pagamento</span>
            <span className="font-medium">Total</span>
            <div className="col-span-2 mb-2 border-t-2" />
            <p>Pix</p>
            <p>{currencyBRL(sales.totalPix)}</p>
            <p>Dinheiro</p>
            <p>{currencyBRL(sales.totalDinheiro)}</p>
            <p>Débito</p>
            <p>{currencyBRL(sales.totalDebito)}</p>
            <p>Crédito</p>
            <p>{currencyBRL(sales.totalCredito)}</p>
            <div className="col-span-2 my-2 grid grid-cols-2 bg-neutral-200 text-neutral-900">
              <p>Total Geral:</p>
              <p>{totalSales}</p>
            </div>
            <div className="col-span-2 mb-5 grid grid-cols-2">
              <p>Comissão: (1,5%)</p>
              <p>{commissionCalc(totalSales)}</p>
            </div>
          </div>

          <h2 className="my-2 text-2xl italic text-neutral-500">Saída</h2>
          <div className="grid grid-cols-2 text-white">
            <div className="col-span-2 border-t-2" />
            <span className="font-medium">Data</span>
            <span className="font-medium">Total</span>
            <div className="col-span-2 mb-2 border-t-2" />
            {expenses.totalDespesaPorDia.map((expense) => (
              <React.Fragment key={expense.date}>
                <p>{formateDate(expense.date)}</p>
                <p>{currencyBRL(expense.value)}</p>
              </React.Fragment>
            ))}
            <div className="col-span-2 mt-5 border-t-2" />
            <span className="font-medium">Forma de Pagamento</span>
            <span className="font-medium">Total</span>
            <div className="col-span-2 mb-2 border-t-2" />
            <p>Despesa</p>
            <p>{currencyBRL(expenses.totalDespesa)}</p>
            <p>Retirada</p>
            <p>{currencyBRL(expenses.totalRetirada)}</p>
            <p>Pagamento</p>
            <p>{currencyBRL(expenses.totalPagamento)}</p>
            <p>Vale</p>
            <p>{currencyBRL(expenses.totalVale)}</p>
            <div className="col-span-2 mb-5 mt-2 grid grid-cols-2 bg-neutral-200 text-neutral-900">
              <p>Total Geral:</p>
              <p>{totalExpenses}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
