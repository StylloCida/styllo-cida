'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export default function ButtonSubmit({
  type,
}: {
  type: 'sale' | 'expense' | 'edit'
}) {
  const { pending } = useFormStatus()

  const color = type === 'sale' || type === 'edit' ? 'success' : 'warning'
  const title =
    type === 'sale'
      ? 'Registrar Venda'
      : type === 'edit'
        ? 'Salvar'
        : 'Registrar Despesa'

  return (
    <Button
      size="sm"
      color={color}
      className="mb-3 w-full rounded-lg text-white"
      type="submit"
      isLoading={pending}
    >
      {title}
    </Button>
  )
}
