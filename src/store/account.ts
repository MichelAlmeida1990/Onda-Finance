import { create } from 'zustand'
import { INITIAL_BALANCE, MOCK_TRANSACTIONS } from '@/lib/mock-data'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  date: string
}

interface AccountState {
  balance: number
  transactions: Transaction[]
  transfer: (description: string, amount: number) => void
}

export const useAccountStore = create<AccountState>()((set) => ({
  balance: INITIAL_BALANCE,
  transactions: MOCK_TRANSACTIONS,
  transfer: (description, amount) =>
    set((state) => ({
      balance: state.balance - amount,
      transactions: [
        {
          id: String(Date.now()),
          description,
          amount: -amount,
          type: 'debit',
          date: new Date().toISOString().split('T')[0],
        },
        ...state.transactions,
      ],
    })),
}))
