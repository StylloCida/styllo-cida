'use client'

import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export default function ButtonSubmit({ type }: { type: 'sale' | 'expense' }) {
  const { pending } = useFormStatus()

  const color = type === 'sale' ? 'success' : 'warning'
  const title = type === 'sale' ? 'Registrar Venda' : 'Registrar Despesa'

  return (
    <Button
      size="sm"
      color={color}
      className="mb-3 rounded-lg text-white"
      type="submit"
      isLoading={pending}
    >
      {title}
    </Button>
  )
}
