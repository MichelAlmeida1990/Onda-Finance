import { useQuery } from '@tanstack/react-query'
import { useAccountStore } from '@/store/account'

export function useTransactions() {
  const transactions = useAccountStore((s) => s.transactions)

  return useQuery({
    queryKey: ['transactions'],
    queryFn: () => Promise.resolve(transactions),
    initialData: transactions,
  })
}
