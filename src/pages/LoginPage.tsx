import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff, ArrowRight, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import { MOCK_USER } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    await new Promise((r) => setTimeout(r, 600))
    if (data.email !== MOCK_USER.email || data.password !== MOCK_USER.password) {
      setError('root', { message: 'E-mail ou senha incorretos' })
      return
    }
    login({ name: MOCK_USER.name, email: MOCK_USER.email })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo — hero */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020617] flex-col justify-between p-12 overflow-hidden">
        {/* Background Decorativo e Mesh Gradient Moderno */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]" />
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/20">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight">Onda Finance</span>
        </div>

        {/* Conteúdo central */}
        <div className="relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Seu dinheiro,<br />
              no seu ritmo.
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed max-w-sm">
              Gerencie transferências, acompanhe seu saldo e tenha controle total das suas finanças.
            </p>
          </div>

          {/* Cards de stats */}
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
              <p className="text-indigo-200 text-xs mb-1">Saldo médio</p>
              <p className="text-white font-bold text-lg">R$ 3.199</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 flex-1">
              <p className="text-indigo-200 text-xs mb-1">Transações</p>
              <p className="text-white font-bold text-lg">5 hoje</p>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <p className="relative text-indigo-300 text-sm">
          © 2025 Onda Finance. Todos os direitos reservados.
        </p>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden bg-slate-50">
        {/* Background com orbes para destacar o glassmorphism */}
        <div className="absolute inset-0 bg-slate-100 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/60 rounded-full blur-[100px] z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-sky-400/60 rounded-full blur-[100px] z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-3/4 -translate-y-3/4 w-[400px] h-[400px] bg-purple-500/60 rounded-full blur-[100px] z-0 pointer-events-none" />
        
        <div className="w-full max-w-[440px] relative z-10">
          
          {/* Logo mobile */}
          <div className="flex flex-col items-center justify-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 mb-3">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-2xl tracking-tight">Onda Finance</span>
          </div>

          <div className="bg-white/20 backdrop-blur-[32px] p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 ring-1 ring-white/60 relative z-20">
            {/* Cabeçalho */}
            <div className="space-y-3 mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bem-vindo(a)</h2>
              <p className="text-slate-500 font-medium text-sm">Acesse sua conta para continuar</p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">E-mail</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                className={cn(
                  'h-14 bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 rounded-xl transition-all shadow-sm',
                  errors.email && 'border-red-400 focus-visible:ring-red-400 focus-visible:bg-red-50/50'
                )}
                {...register('email')}
                data-testid="email-input"
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={cn(
                    'h-14 bg-slate-50/50 hover:bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 rounded-xl transition-all shadow-sm pr-12',
                    errors.password && 'border-red-400 focus-visible:ring-red-400 focus-visible:bg-red-50/50'
                  )}
                  {...register('password')}
                  data-testid="password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-600 text-center">{errors.root.message}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="login-btn"
              className="w-full h-12 bg-primary hover:bg-indigo-700 text-white font-bold rounded-xl text-base shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Entrar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Dica de credenciais */}
          <div className="mt-8 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-5 text-center transition-colors hover:bg-indigo-50">
            <p className="text-xs font-bold text-indigo-800 uppercase tracking-widest mb-3">Acesso de Demonstração</p>
            <div className="flex justify-center gap-6">
              <div>
                <p className="text-[10px] text-indigo-400 uppercase font-bold mb-1">E-mail</p>
                <p className="text-sm text-indigo-700 font-mono font-medium">usuario@onda.com</p>
              </div>
              <div className="w-px bg-indigo-200" />
              <div>
                <p className="text-[10px] text-indigo-400 uppercase font-bold mb-1">Senha</p>
                <p className="text-sm text-indigo-700 font-mono font-medium">123456</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
