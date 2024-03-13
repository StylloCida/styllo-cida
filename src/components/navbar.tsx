import { Button } from '@nextui-org/react'
import { ScrollText } from 'lucide-react'
import ModalExpense from './modal/expenses'
import ModalSale from './modal/sales'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex flex-col items-center justify-between">
      <div className="flex w-full space-x-4">
        <ModalSale />
        <ModalExpense />
        <Button color="secondary" className="flex-1">
          <Link href="/relatorio" className="flex items-center">
            <ScrollText size={20} className="mr-1.5" />
            Relatório
          </Link>
        </Button>
      </div>

      <Link
        href="/resumo"
        className="mt-5 w-full rounded-xl border p-2 text-center text-white"
      >
        Resumo de Hoje
      </Link>
    </nav>
  )
}
