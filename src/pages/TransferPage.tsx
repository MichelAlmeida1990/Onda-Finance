import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAccountStore } from '@/store/account'
import { cn } from '@/lib/utils'

const transferSchema = z.object({
  recipient: z.string().min(3, 'Nome do destinatário obrigatório'),
  amount: z.coerce
    .number({ invalid_type_error: 'Valor inválido' })
    .positive('Valor deve ser positivo')
    .max(999999, 'Valor muito alto'),
  description: z.string().min(1, 'Descrição obrigatória'),
})

type TransferForm = z.infer<typeof transferSchema>

export default function TransferPage() {
  const navigate = useNavigate()
  const { balance, transfer } = useAccountStore()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransferForm>({ resolver: zodResolver(transferSchema) })

  const onSubmit = async (data: TransferForm) => {
    if (data.amount > balance) {
      setError('amount', { message: 'Saldo insuficiente' })
      return
    }
    await new Promise((r) => setTimeout(r, 600))
    transfer(`Transferência para ${data.recipient} — ${data.description}`, data.amount)
    setSuccess(true)
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (success) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] mix-blend-screen" />
        </div>
        <div className="w-full max-w-sm bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative z-10 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-500/20 mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Sucesso!</h2>
              <p className="text-sm text-slate-400 mt-2">Sua transferência foi realizada.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Novo Saldo</p>
              <p className="text-xl font-extrabold text-white">{fmt(useAccountStore.getState().balance)}</p>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all">
              Ir para o Início
            </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-indigo-500/30 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <header className="relative z-40 bg-white/5 backdrop-blur-3xl border-b border-white/10 px-6 py-4 sticky top-0 shadow-lg shadow-black/20">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-400" /> Transferir
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-10 relative z-10 space-y-8">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
               <p className="text-sm text-slate-400 font-medium">Saldo disponível</p>
               <p className="text-3xl font-extrabold text-white mt-1">{fmt(balance)}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Para quem?</label>
                <input
                  className={cn(
                    'w-full h-14 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/50 rounded-xl px-4 outline-none transition-all',
                    errors.recipient && 'border-red-400/50 focus:ring-red-400/50'
                  )}
                  placeholder="Nome do destinatário"
                  {...register('recipient')}
                  data-testid="recipient-input"
                />
                {errors.recipient && <p className="text-xs text-red-400">{errors.recipient.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Qual o valor?</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                  <input
                    type="number" step="0.01"
                    className={cn(
                      'w-full h-14 bg-white/5 border border-white/10 text-white font-bold text-lg focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/50 rounded-xl pl-12 pr-4 outline-none transition-all',
                      errors.amount && 'border-red-400/50 focus:ring-red-400/50'
                    )}
                    placeholder="0,00"
                    {...register('amount')}
                    data-testid="amount-input"
                  />
                </div>
                {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300">Descrição (opcional)</label>
                <input
                  className={cn(
                    'w-full h-14 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/50 rounded-xl px-4 outline-none transition-all',
                    errors.description && 'border-red-400/50 focus:ring-red-400/50'
                  )}
                  placeholder="Ex: Aluguel, Pizza..."
                  {...register('description')}
                  data-testid="description-input"
                />
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
              </div>

              <Button type="submit" className="w-full h-14 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]" disabled={isSubmitting} data-testid="transfer-btn">
                {isSubmitting ? 'Processando...' : 'Transferir agora'}
              </Button>
            </form>
        </div>
      </main>
    </div>
  )
}
