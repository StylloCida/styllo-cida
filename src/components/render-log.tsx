'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { Expense, Sale } from '@prisma/client'
import { DollarSign, MessageSquareMore, Pin, Wallet } from 'lucide-react'
import Tag from './tag'

function Title({ title }: { title: string }) {
  return (
    <h1 className="mb-3 mt-5 text-lg font-medium italic text-neutral-300 md:text-xl">
      {title.toUpperCase()}
    </h1>
  )
}

export function RenderSales({ data }: { data: Sale[] }) {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <>
      <Title title="Vendas" />
      <Table>
        <TableHeader>
          <TableColumn>
            <DollarSign size={20} />
          </TableColumn>
          <TableColumn>
            <Wallet size={20} />
          </TableColumn>
          <TableColumn>
            <MessageSquareMore size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={'Nenhuma venda registrada hoje'}>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.value.toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell>{<Tag type={item.category} />}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="w-full p-2 text-end text-sm font-medium text-neutral-300">
        Total:{' '}
        {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
    </>
  )
}

export function RenderExpenses({ data }: { data: Expense[] }) {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <>
      <Title title="Despesas" />
      <Table>
        <TableHeader>
          <TableColumn>
            <DollarSign size={20} />
          </TableColumn>
          <TableColumn>
            <Pin size={20} />
          </TableColumn>
          <TableColumn>
            <MessageSquareMore size={20} />
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={'Nenhuma despesa registrada hoje'}>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.value.toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell>{<Tag type={item.category} />}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <span className="w-full p-2 text-end text-sm font-medium text-neutral-300">
        Total:{' '}
        {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
    </>
  )
}
