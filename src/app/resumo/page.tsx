import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import * as actions from '@/actions'
import Resume from '@/components/resume'
import RevalidateCache from '@/components/revalidate-cache'

export default async function Resumo() {
  const dailyLog = await actions.getDailyLogs()

  return (
    <>
      <Link href="/" className="inline-flex text-neutral-100">
        <ArrowLeft className="mr-2 w-5" />
        Voltar
      </Link>
      <h1 className="mb-4 p-2 text-center text-xl text-neutral-100">
        Resumo de Hoje
      </h1>
      <Resume dailyLog={dailyLog} />
      <RevalidateCache />
    </>
  )
}
