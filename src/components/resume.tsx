'use client'

import { Today } from '@/utils'
import { Textarea } from '@nextui-org/react'
import { Sale, Expense } from '@prisma/client'
import { Copy } from 'lucide-react'

interface Props {
  dailyLog: {
    sales: Sale[]
    expenses: Expense[]
  }
}

export default function Resume({ dailyLog }: Props) {
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
  const totalCrediloja = dailyLog.sales.reduce((acc, item) => {
    if (item.category === 'CREDILOJA') {
      acc += item.value
    }
    return acc
  }, 0)

  const resume = `Vendas do dia ${Today.toLocaleDateString('pt-br')}\n
  Pix: ${totalPix.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
  Dinheiro: ${totalDinheiro.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
  Débito: ${totalDebito.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
  Crédito: ${totalCredito.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
  Crediloja: ${totalCrediloja.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`

  function copyToClipboard() {
    navigator.clipboard
      .writeText(resume)
      .then(() => alert('Texto copiado para área de transferência.'))
  }

  return (
    <div className="relative">
      <Textarea value={resume} classNames={{ input: 'p-2.5' }} disabled />
      <button className="absolute right-3 top-3" onClick={copyToClipboard}>
        <Copy size={20} />
      </button>
    </div>
  )
}
