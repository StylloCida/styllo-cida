'use client'

import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { PlusCircle } from 'lucide-react'
import { useFormState } from 'react-dom'
import * as actions from '@/actions'
import { NumericFormat } from 'react-number-format'
import ButtonSubmit from '../button-submit'

export default function ModalSale() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [formState, action] = useFormState(actions.newSale, {
    success: false,
    errors: {},
  })

  return (
    <>
      <Button onPress={onOpen} color="success" className="flex-1 text-white">
        <PlusCircle size={20} />
        <span>Venda</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Venda
              </ModalHeader>
              <form action={action} className="space-y-5">
                <ModalBody>
                  <NumericFormat
                    prefix="R$ "
                    customInput={Input}
                    isInvalid={!!formState?.errors.value}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    placeholder="R$ 0,00"
                    name="value"
                  />
                  <Select
                    name="category"
                    placeholder="Forma de Pagamento"
                    isInvalid={!!formState?.errors.category}
                  >
                    <SelectItem key={'DINHEIRO'}>DINHEIRO</SelectItem>
                    <SelectItem key={'PIX'}>PIX</SelectItem>
                    <SelectItem key={'DEBITO'}>DEBITO</SelectItem>
                    <SelectItem key={'CREDITO'}>CREDITO</SelectItem>
                  </Select>
                  <Input type="date" name="date" label="Data (opcional)" />
                  <Textarea
                    label="Observação"
                    name="description"
                    isInvalid={!!formState?.errors.description}
                    errorMessage={formState?.errors.description}
                  />
                </ModalBody>
                <ModalFooter className="flex w-full flex-col">
                  {formState?.success && (
                    <span className="rounded-lg border-2 border-green-400 bg-green-200 p-1.5 text-center text-sm text-green-800">
                      Registro efetuado com sucesso
                    </span>
                  )}
                  <ButtonSubmit type="sale" />
                </ModalFooter>
              </form>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  )
}
