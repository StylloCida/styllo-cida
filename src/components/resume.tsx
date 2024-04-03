'use client'

import { Today, currencyBRL } from '@/utils'
import { Button, Input, Textarea } from '@nextui-org/react'
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
  ${totalPix > 0 ? `Pix: ${currencyBRL(totalPix)}` : null}
  ${totalDinheiro > 0 ? `Dinheiro: ${currencyBRL(totalDinheiro)}` : null}
  ${totalDebito > 0 ? `Débito: ${currencyBRL(totalDebito)}` : null}
  ${totalCredito > 0 ? `Crédito: ${currencyBRL(totalCredito)}` : null}
  \nTotal de vendas do dia: ${currencyBRL(totalVendasDoDia)}\n
  ${totalDespesaLoja > 0 ? `Despesa loja: ${currencyBRL(totalDespesaLoja)}` : null}
  ${totalRetirada > 0 ? `Retirada: ${currencyBRL(totalRetirada)}` : null}
  ${totalPagamento > 0 ? `Pagamento: ${currencyBRL(totalPagamento)}` : null}
  ${totalVale > 0 ? `Vale: ${currencyBRL(totalVale)}` : null}
  ${totalDespesasDoDia > 0 ? `\nTotal: ${currencyBRL(totalDespesasDoDia)}` : null}\n
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
        <Button className="mt-3 w-full" onClick={copyToClipboard} size="sm">
          <Copy size={20} /> Copiar texto
        </Button>
      </div>
    </>
  )
}
