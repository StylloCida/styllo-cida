import EditForm from '@/components/edit-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export default function EditRecord() {
  return (
    <>
      <Link href="/" className="mb-5 inline-flex text-neutral-100">
        <ArrowLeft className="mr-2 w-5" />
        Voltar
      </Link>
      <h1 className="my-3 text-lg italic text-neutral-500">
        Editar Lançamento
      </h1>
      <Suspense>
        <EditForm />
      </Suspense>
    </>
  )
}
