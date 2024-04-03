import { Chip } from '@nextui-org/react'

interface Props {
  type:
    | 'DINHEIRO'
    | 'PIX'
    | 'DEBITO'
    | 'CREDITO'
    | 'DESPESA'
    | 'RETIRADA'
    | 'PAGAMENTO'
    | 'VALE'
}

export default function Tag({ type }: Props) {
  switch (type) {
    case 'DINHEIRO':
      return (
        <Chip size="sm" className="bg-green-600 text-white">
          Dinheiro
        </Chip>
      )
    case 'PIX':
      return (
        <Chip size="sm" className="bg-emerald-600 text-white">
          Pix
        </Chip>
      )
    case 'DEBITO':
      return (
        <Chip size="sm" className="bg-sky-600 text-white">
          Débito
        </Chip>
      )
    case 'CREDITO':
      return (
        <Chip size="sm" className="bg-violet-600 text-white">
          Crédito
        </Chip>
      )

    case 'DESPESA':
      return (
        <Chip size="sm" className="bg-lime-600 text-white">
          Loja
        </Chip>
      )
    case 'RETIRADA':
      return (
        <Chip size="sm" className="bg-amber-600 text-white">
          Retirada
        </Chip>
      )
    case 'PAGAMENTO':
      return (
        <Chip size="sm" className="bg-yellow-600 text-white">
          Pagamento
        </Chip>
      )
    case 'VALE':
      return (
        <Chip size="sm" className="bg-fuchsia-500 text-white">
          Vale
        </Chip>
      )

    default:
      return <Chip>Default</Chip>
  }
}
