'use client'

import * as actions from '@/actions'
import { Button } from '@nextui-org/react'
import { RefreshCcw } from 'lucide-react'

export default function RevalidateCache() {
  return (
    <Button
      onClick={async () => actions.revalidateCache()}
      size="sm"
      className="mt-3 w-full"
    >
      <RefreshCcw size={18} /> Atualizar
    </Button>
  )
}
