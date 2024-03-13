'use client'

import { Months } from '@/utils'
import { Button, Select, SelectItem } from '@nextui-org/react'

export default function DatePicker() {
  return (
    <>
      <div>
        <Select placeholder="Escolha o mês" label="Mês" name="month">
          {Months.map((month) => (
            <SelectItem key={month.key}>{month.label}</SelectItem>
          ))}
        </Select>
        <Button className="my-4 w-full" variant="faded">
          Buscar
        </Button>
      </div>
    </>
  )
}
