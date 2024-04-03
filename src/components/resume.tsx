'use client'

import { Today, currencyBRL } from '@/utils'
import { Input, Textarea } from '@nextui-org/react'
import { Sale, Expense } from '@prisma/client'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'

interface Props {
  dailyLog: {
    sales: Sale[]
    expenses: Expense[]
  }
}

export default function Resume({ dailyLog }: Props) {
  const [opening, setOpening] = useState('')
  const [closure, setClosure] = useState('')

  const totalPix = dailyLog.sales.reduce((acc, item) => {
    if (item.category === 'PIX') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalDinheiro = dailyLog.sales.reduce((acc, item) => {
    if (item.category === 'DINHEIRO') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalDebito = dailyLog.sales.reduce((acc, item) => {
    if (item.category === 'DEBITO') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalCredito = dailyLog.sales.reduce((acc, item) => {
    if (item.category === 'CREDITO') {
      acc += item.value
    }
    return acc
  }, 0)

  const totalDespesaLoja = dailyLog.expenses.reduce((acc, item) => {
    if (item.category === 'DESPESA') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalRetirada = dailyLog.expenses.reduce((acc, item) => {
    if (item.category === 'RETIRADA') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalPagamento = dailyLog.expenses.reduce((acc, item) => {
    if (item.category === 'PAGAMENTO') {
      acc += item.value
    }
    return acc
  }, 0)
  const totalVale = dailyLog.expenses.reduce((acc, item) => {
    if (item.category === 'VALE') {
      acc += item.value
    }
    return acc
  }, 0)

  const totalVendasDoDia = totalPix + totalDinheiro + totalDebito + totalCredito
  const totalDespesasDoDia =
    totalDespesaLoja + totalRetirada + totalPagamento + totalVale

  const resume = `Vendas do dia ${Today.toLocaleDateString('pt-br')}\n
  ${totalPix && `Pix: ${currencyBRL(totalPix)}`}
  ${totalDinheiro && `Dinheiro: ${currencyBRL(totalDinheiro)}`}
  ${totalDebito && `Débito: ${currencyBRL(totalDebito)}`}
  ${totalCredito && `Crédito: ${currencyBRL(totalCredito)}`}\n
  Total de vendas do dia: ${currencyBRL(totalVendasDoDia)}\n
  ${totalDespesaLoja && `Despesa loja: ${currencyBRL(totalDespesaLoja)}`}
  ${totalRetirada && `Retirada: ${currencyBRL(totalRetirada)}`}
  ${totalPagamento && `Pagamento: ${currencyBRL(totalPagamento)}`}
  ${totalVale && `Vale: ${currencyBRL(totalVale)}`}\n
  ${totalDespesasDoDia && `Total: ${currencyBRL(totalDespesasDoDia)}`}\n
  Abertura em dinheiro: ${opening}
  Fechamento em dinheiro: ${closure}`

  function copyToClipboard() {
    navigator.clipboard
      .writeText(resume)
      .then(() => alert('Texto copiado para área de transferência.'))
  }

  return (
    <>
      <div className="my-5 flex flex-col space-y-3">
        <NumericFormat
          prefix="R$ "
          customInput={Input}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          placeholder="R$ 0,00"
          label="Abertura"
          value={opening}
          onChange={(e) => setOpening(e.target.value)}
        />
        <NumericFormat
          prefix="R$ "
          customInput={Input}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={2}
          fixedDecimalScale
          placeholder="R$ 0,00"
          label="Fechamento"
          value={closure}
          onChange={(e) => setClosure(e.target.value)}
        />
      </div>
      <div className="relative">
        <Textarea
          value={resume}
          classNames={{ input: 'p-2.5 min-h-[240px]' }}
          disabled
        />
        <button className="absolute right-3 top-3" onClick={copyToClipboard}>
          <Copy size={20} />
        </button>
      </div>
    </>
  )
}
