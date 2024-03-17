import RecordMonth from '@/components/record-month'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function RelatorioMensal() {
  return (
    <>
      <Link href="/relatorio" className="mb-5 inline-flex text-neutral-100">
        <ArrowLeft className="mr-2 w-5" />
        Voltar
      </Link>
      <RecordMonth />
    </>
  )
}
