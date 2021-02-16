import { AccountModel } from './../../models/account'

export type AddAccountParams = {
  email: string
  password: string
}

export interface AddAccount {
  add: (params: AddAccountParams) => AccountModel
}
