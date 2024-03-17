export const Today = new Date()
Today.setHours(0, 0, 0, 0)

export const Months = [
  { key: '1', label: 'Janeiro' },
  { key: '2', label: 'Fevereiro' },
  { key: '3', label: 'Março' },
  { key: '4', label: 'Abril' },
  { key: '5', label: 'Maio' },
  { key: '6', label: 'Junho' },
  { key: '7', label: 'Julho' },
  { key: '8', label: 'Agosto' },
  { key: '9', label: 'Setembro' },
  { key: '10', label: 'Outubro' },
  { key: '11', label: 'Novembro' },
  { key: '12', label: 'Dezembro' },
]

export const currencyBRL = (number: number) => {
  return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export const selectedMonth = (initialMonth: string, finalMonth: string) => {
  const initial = new Date()
  initial.setMonth(Number(initialMonth) - 1)

  if (finalMonth && finalMonth !== initialMonth) {
    const final = new Date()
    final.setMonth(Number(finalMonth) - 1)
    return `${initial.toLocaleDateString('pt-br', { month: 'long' })} até ${final.toLocaleDateString('pt-br', { month: 'long' })}`
  } else {
    return initial.toLocaleDateString('pt-br', { month: 'long' })
  }
}

export const commissionCalc = (value: string, percent: number) => {
  const clearedValue = parseFloat(
    value
      .replace(/[^0-9,.]/g, '')
      .replace(',', '.')
      .replace('.', ''),
  )
  return currencyBRL(Math.round(clearedValue * (percent / 100)))
}
