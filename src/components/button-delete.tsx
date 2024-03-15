'use client'

import { Button } from '@nextui-org/react'

interface Props {
  id: string
  type: 'sale' | 'expense'
  loading: boolean
  onDelete: (id: string, category: 'sale' | 'expense') => void
}

export default function ButtonDelete({ id, type, loading, onDelete }: Props) {
  return (
    <Button
      color="danger"
      size="sm"
      className="w-full"
      onClick={() => onDelete(id, type)}
      isLoading={loading}
    >
      Excluir lançamento
    </Button>
  )
}
