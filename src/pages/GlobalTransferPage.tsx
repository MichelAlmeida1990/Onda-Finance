import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Globe, TrendingUp, Send, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const globalTransferSchema = z.object({
  fromCountry: z.string().min(1, 'Selecione o país de origem'),
  toCountry: z.string().min(1, 'Selecione o país de destino'),
  fromCurrency: z.string().min(1, 'Selecione a moeda de origem'),
  toCurrency: z.string().min(1, 'Selecione a moeda de destino'),
  amount: z.coerce.number().min(10, 'Valor mínimo de $10').max(50000, 'Valor máximo de $50,000'),
  recipient: z.string().min(3, 'Nome do destinatário obrigatório'),
  email: z.string().email('E-mail inválido'),
  transferType: z.enum(['fiat', 'crypto']),
})

type GlobalTransferForm = z.infer<typeof globalTransferSchema>

const countries = [
  { code: 'US', name: 'Estados Unidos', currency: 'USD', flag: '🇺🇸' },
  { code: 'BR', name: 'Brasil', currency: 'BRL', flag: '🇧🇷' },
  { code: 'GB', name: 'Reino Unido', currency: 'GBP', flag: '🇬🇧' },
  { code: 'EU', name: 'União Europeia', currency: 'EUR', flag: '🇪🇺' },
  { code: 'JP', name: 'Japão', currency: 'JPY', flag: '🇯🇵' },
  { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
  { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽' },
  { code: 'CA', name: 'Canadá', currency: 'CAD', flag: '🇨🇦' },
]

const cryptoCurrencies = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', icon: '₮' },
  { symbol: 'USDC', name: 'USD Coin', icon: '$' },
]

export default function GlobalTransferPage() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [processing, setProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GlobalTransferForm>({ resolver: zodResolver(globalTransferSchema) })

  const watchedValues = watch()
  const { fromCurrency, toCurrency, amount, transferType } = watchedValues

  // Simular taxa de câmbio
  const calculateExchangeRate = () => {
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      // Taxas simuladas
      const rates: { [key: string]: number } = {
        'USD-BRL': 5.2,
        'BRL-USD': 0.192,
        'USD-EUR': 0.92,
        'EUR-USD': 1.087,
        'USD-GBP': 0.79,
        'GBP-USD': 1.27,
        'BTC-USD': 45000,
        'ETH-USD': 3000,
      }
      const key = `${fromCurrency}-${toCurrency}`
      setExchangeRate(rates[key] || 1)
    } else {
      setExchangeRate(1)
    }
  }

  const onSubmit = async (data: GlobalTransferForm) => {
    setProcessing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setProcessing(false)
    setSuccess(true)
  }

  const convertedAmount = amount ? (amount * exchangeRate).toFixed(2) : '0.00'

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Transferência Global Enviada!</h2>
          <p className="text-slate-600 mb-6">
            {amount} {fromCurrency} → {convertedAmount} {toCurrency}
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-slate-500 mb-1">Taxa de câmbio</p>
            <p className="text-2xl font-bold text-slate-900">1 {fromCurrency} = {exchangeRate} {toCurrency}</p>
          </div>
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-400" />
              Transferência Global
            </h1>
            <p className="text-slate-400">Envie dinheiro para qualquer lugar do mundo</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Tipo de Transferência */}
                <div>
                  <label className="text-white text-sm font-medium mb-3 block">Tipo de Transferência</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setValue('transferType', 'fiat')}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all",
                        transferType === 'fiat' 
                          ? "border-blue-400 bg-blue-400/20 text-white" 
                          : "border-white/20 text-white/70 hover:border-white/40"
                      )}
                    >
                      <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Moeda Fiduciária</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setValue('transferType', 'crypto')}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all",
                        transferType === 'crypto' 
                          ? "border-blue-400 bg-blue-400/20 text-white" 
                          : "border-white/20 text-white/70 hover:border-white/40"
                      )}
                    >
                      <Shield className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Criptomoeda</span>
                    </button>
                  </div>
                </div>

                {/* Países e Moedas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">De</label>
                    <select
                      {...register('fromCountry')}
                      className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Selecione o país</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Para</label>
                    <select
                      {...register('toCountry')}
                      className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Selecione o país</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Moedas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Moeda de Origem</label>
                    <select
                      {...register('fromCurrency')}
                      onChange={(e) => {
                        setValue('fromCurrency', e.target.value)
                        calculateExchangeRate()
                      }}
                      className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Selecione</option>
                      {transferType === 'crypto' ? (
                        cryptoCurrencies.map(crypto => (
                          <option key={crypto.symbol} value={crypto.symbol}>
                            {crypto.icon} {crypto.name} ({crypto.symbol})
                          </option>
                        ))
                      ) : (
                        Array.from(new Set(countries.map(c => c.currency))).map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">Moeda de Destino</label>
                    <select
                      {...register('toCurrency')}
                      onChange={(e) => {
                        setValue('toCurrency', e.target.value)
                        calculateExchangeRate()
                      }}
                      className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Selecione</option>
                      {transferType === 'crypto' ? (
                        cryptoCurrencies.map(crypto => (
                          <option key={crypto.symbol} value={crypto.symbol}>
                            {crypto.icon} {crypto.name} ({crypto.symbol})
                          </option>
                        ))
                      ) : (
                        Array.from(new Set(countries.map(c => c.currency))).map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                {/* Valor */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Valor a Transferir</label>
                  <input
                    type="number"
                    {...register('amount')}
                    placeholder="0.00"
                    onChange={(e) => {
                      setValue('amount', parseFloat(e.target.value))
                      calculateExchangeRate()
                    }}
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                  {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>}
                </div>

                {/* Destinatário */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Nome do Destinatário</label>
                  <input
                    {...register('recipient')}
                    placeholder="Nome completo"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                  {errors.recipient && <p className="text-red-400 text-sm mt-1">{errors.recipient.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">E-mail do Destinatário</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="email@exemplo.com"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-lg transition-all"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processando...
                    </div>
                  ) : (
                    `Transferir ${amount || '0.00'} ${fromCurrency || ''}`
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Resumo */}
          <div className="space-y-6">
            {/* Taxa de Câmbio */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Taxa de Câmbio
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>1 {fromCurrency || '---'}</span>
                  <span className="font-mono">{exchangeRate} {toCurrency || '---'}</span>
                </div>
                <div className="flex justify-between text-white pt-3 border-t border-white/20">
                  <span>Valor a receber</span>
                  <span className="font-mono text-xl font-bold">
                    {convertedAmount} {toCurrency || ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Por que escolher Onda Finance?
              </h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Taxas até 80% mais baratas que bancos tradicionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Entrega em minutos para 180+ países</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Proteção contra fraudes com blockchain</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Suporte 24/7 em 10 idiomas</span>
                </li>
              </ul>
            </div>

            {/* Tempo Estimado */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6">
              <div className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Entrega Rápida</p>
                  <p className="text-sm text-white/80">5-30 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
