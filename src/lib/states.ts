export interface SaleFormState {
  success: boolean
  errors: {
    value?: string[]
    category?: string[]
    description?: string[]
    _form?: string
  }
}

export interface ExpenseFormState {
  success: boolean
  errors: {
    value?: string[]
    category?: string[]
    description?: string[]
    _form?: string
  }
}
