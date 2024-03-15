'use client'

import ButtonSubmit from '@/components/button-submit'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { CategoryExpense, CategorySale } from '@prisma/client'
import { redirect, useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { NumericFormat } from 'react-number-format'
import * as actions from '@/actions'
import ButtonDelete from '@/components/button-delete'
import { useState } from 'react'

export default function EditForm() {
  const [formState, action] = useFormState(actions.updateRecord, {
    success: false,
    errors: {},
  })
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const value = searchParams.get('valor')
  const category = searchParams.get('categoria') as
    | CategorySale
    | CategoryExpense
  const desc = searchParams.get('desc')

  if (!id || !category) redirect('/')

  const isSale =
    category === 'PIX' ||
    category === 'DINHEIRO' ||
    category === 'DEBITO' ||
    category === 'CREDITO' ||
    category === 'CREDILOJA'

  const [loading, setLoading] = useState(false)

  async function onDelete(id: string, category: 'sale' | 'expense') {
    const confirmation = confirm('Excluir lançamento?')

    if (confirmation) {
      setLoading(true)
      try {
        await actions.deleteRecord(id, category)
      } catch (error) {
        alert('Não foi possível excluir o registro.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      {isSale ? (
        // Formulário VENDAS
        <form action={action} className="space-y-5">
          <input type="hidden" value={id} name="id" />
          <input type="hidden" value="sale" name="type" />

          <NumericFormat
            prefix="R$ "
            customInput={Input}
            // isInvalid={!!formState?.errors.value}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            placeholder="R$ 0,00"
            name="value"
            defaultValue={value}
            isInvalid={!!formState?.errors.value}
          />
          <Select
            name="category"
            placeholder="Forma de Pagamento"
            isInvalid={!!formState?.errors.category}
          >
            <SelectItem key={'DINHEIRO'}>DINHEIRO</SelectItem>
            <SelectItem key={'PIX'}>PIX</SelectItem>
            <SelectItem key={'DEBITO'}>DEBITO</SelectItem>
            <SelectItem key={'CREDITO'}>CREDITO</SelectItem>
            <SelectItem key={'CREDILOJA'}>CREDILOJA</SelectItem>
          </Select>
          <Textarea label="Observação" name="description" value={desc || ''} />
          <ButtonSubmit type="edit" />
          <ButtonDelete
            id={id}
            type="sale"
            loading={loading}
            onDelete={onDelete}
          />
        </form>
      ) : (
        // Formulário DESPESAS
        <form action={action} className="space-y-5">
          <input type="hidden" value={id} name="id" />
          <input type="hidden" value="expense" name="type" />

          <NumericFormat
            prefix="R$ "
            customInput={Input}
            // isInvalid={!!formState?.errors.value}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            placeholder="R$ 0,00"
            name="value"
            defaultValue={value}
          />
          <Select name="category" placeholder="Categoria">
            <SelectItem key={'DESPESA'}>DESPESA</SelectItem>
            <SelectItem key={'RETIRADA'}>RETIRADA</SelectItem>
            <SelectItem key={'PAGAMENTO'}>PAGAMENTO</SelectItem>
            <SelectItem key={'VALE'}>VALE</SelectItem>
          </Select>
          <Textarea label="Observação" name="description" value={desc || ''} />
          <ButtonSubmit type="edit" />
          <ButtonDelete
            id={id}
            type="expense"
            loading={loading}
            onDelete={onDelete}
          />
        </form>
      )}
    </>
  )
}
