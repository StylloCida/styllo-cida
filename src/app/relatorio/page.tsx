import { Button } from '@nextui-org/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Relatorio() {
  return (
    <>
      <Link href="/" className="mb-5 inline-flex text-neutral-100">
        <ArrowLeft className="mr-2 w-5" />
        Voltar
      </Link>
      <Link href="/relatorio/diario" className="mx-auto mb-5 flex">
        <Button variant="faded" className="flex-1 font-medium">
          Diário
        </Button>
      </Link>
      <Link href="/relatorio/mensal" className="mx-auto mb-5 flex">
        <Button variant="faded" className="flex-1 font-medium">
          Mensal
        </Button>
      </Link>
    </>
  )
}
