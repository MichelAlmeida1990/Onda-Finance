import { useNavigate } from 'react-router-dom'
import { 
  ArrowUpRight, ArrowDownLeft, LogOut, Send, 
  Bell, QrCode, ScanLine, Wallet, 
  CreditCard, ChevronRight, BarChart3, Receipt, Eye, EyeOff, Globe, TrendingUp
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'
import { useAccountStore } from '@/store/account'
import { useTransactions } from '@/hooks/useTransactions'
import FlipCard from '@/components/FlipCard'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const balance = useAccountStore((s) => s.balance)
  const { data: transactions } = useTransactions()
  const [showBalance, setShowBalance] = useState(true)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* Mesh Gradient Animado */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* HEADER / TOPBAR */}
      <header className="bg-white/5 backdrop-blur-3xl border-b border-white/10 px-6 py-4 sticky top-0 z-40 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white font-extrabold text-xl ring-2 ring-white/10 shadow-lg shadow-indigo-500/30">
              {user?.name?.charAt(0) || 'O'}
            </div>
            <div>
              <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Olá, de volta</p>
              <h2 className="text-xl font-extrabold text-white tracking-tight">{user?.name || 'Cliente Onda'}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-full w-10 h-10 transition-colors text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-rose-500/10 hover:text-rose-400 rounded-full w-10 h-10 text-slate-300 transition-colors" title="Sair">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10 relative z-10">
        
        {/* HIGHLIGHT SECTION: SALDO & CARTÃO */}
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Card Saldo (Ocupa 3 colunas) */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between min-h-[320px] group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] group-hover:bg-indigo-400/30 transition-colors duration-1000 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-between space-y-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Wallet className="w-4 h-4 text-indigo-300" />
                  </div>
                  <span className="text-indigo-200 font-bold tracking-wide text-sm">Conta Corrente</span>
                </div>
                <button onClick={() => setShowBalance(!showBalance)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-indigo-300 hover:text-white transition-all backdrop-blur-md">
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              
              <div>
                <p className="text-sm font-medium text-indigo-300/80 mb-2">Saldo disponível</p>
                <div className="flex items-end gap-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
                    {showBalance ? fmt(balance) : 'R$ •••••'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                <Button 
                  onClick={() => navigate('/global-transfer')}
                  className="h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-600/30 font-bold text-base px-8 flex-1 md:flex-none transition-all active:scale-95 border border-blue-500/50"
                >
                  <Globe className="w-5 h-5 mr-3" /> Transferência Global
                </Button>
                <Button 
                  onClick={() => navigate('/transfer')}
                  className="h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-600/30 font-bold text-base px-8 flex-1 md:flex-none transition-all active:scale-95 border border-indigo-500/50"
                >
                  <Send className="w-5 h-5 mr-3" /> Transferência Local
                </Button>
              </div>
            </div>
          </div>

          {/* Area do Cartão Virtual (Ocupa 2 colunas) */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="relative z-10 w-full flex justify-between items-start mb-8 text-left">
               <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Meus Cartões</h3>
                  <p className="text-indigo-200/80 text-sm font-medium mt-1">Interaja com seu cartão Black.</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center text-indigo-300">
                  <CreditCard className="w-5 h-5" />
               </div>
             </div>
             
             <div className="relative z-10 scale-[0.85] sm:scale-100 origin-center transition-transform duration-500 group-hover:scale-[1.02]">
               <FlipCard />
             </div>

             <div className="w-full relative z-10 mt-6 pt-6 border-t border-white/10">
                <Button variant="ghost" onClick={() => navigate('/cartoes')} className="w-full text-indigo-300 font-bold hover:bg-white/10 hover:text-white h-12 rounded-xl transition-colors">
                  Configurar cartões <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
             </div>
          </div>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
           {[
             { icon: Globe, label: 'Global', color: 'text-cyan-400', bg: 'bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10', path: '/global-transfer' },
             { icon: QrCode, label: 'Área Pix', color: 'text-teal-400', bg: 'bg-white/5 hover:border-teal-500/50 hover:bg-teal-500/10', path: '/pix' },
             { icon: ScanLine, label: 'Pagar', color: 'text-blue-400', bg: 'bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10', path: '/pagar' },
             { icon: Send, label: 'Transferir', color: 'text-indigo-400', bg: 'bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10', path: '/transfer' },
             { icon: TrendingUp, label: 'Crypto', color: 'text-purple-400', bg: 'bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10', path: '/crypto' },
             { icon: Wallet, label: 'Depositar', color: 'text-purple-400', bg: 'bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10', path: '/depositar' },
             { icon: CreditCard, label: 'Cartões', color: 'text-rose-400', bg: 'bg-white/5 hover:border-rose-500/50 hover:bg-rose-500/10', path: '/cartoes' },
             { icon: BarChart3, label: 'Investir', color: 'text-emerald-400', bg: 'bg-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10', path: '/investir' },
           ].map((action, i) => (
             <button key={i} onClick={() => navigate(action.path)} className="flex flex-col items-center gap-3 cursor-pointer group w-full">
               <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] border border-white/10 flex items-center justify-center shadow-lg transition-all group-hover:-translate-y-1 ${action.bg}`}>
                 <action.icon className={`w-7 h-7 md:w-8 md:h-8 ${action.color} group-hover:scale-110 transition-transform`} />
               </div>
               <span className="text-xs md:text-sm font-bold text-slate-300 group-hover:text-white transition-colors text-center">{action.label}</span>
             </button>
           ))}
        </div>

        {/* BOTTOM SECTION: GRAFICO & EXTRATO */}
        <div className="grid lg:grid-cols-3 gap-8">
           
           {/* Gráfico de Gastos */}
           <div className="lg:col-span-1 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-extrabold text-white tracking-tight">Gastos Mensais</h3>
                <span className="text-xs font-bold bg-white/10 text-slate-300 px-3 py-1.5 rounded-full border border-white/5">Março</span>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-300 text-sm flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" /> Alimentação
                    </span>
                    <span className="font-extrabold text-white">R$ 1.250</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full w-[45%]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-300 text-sm flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" /> Transporte
                    </span>
                    <span className="font-extrabold text-white">R$ 680</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full w-[30%]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-300 text-sm flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Lazer
                    </span>
                    <span className="font-extrabold text-white">R$ 420</span>
                  </div>
                  <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full w-[20%]" />
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/10">
                <Button variant="ghost" className="w-full h-12 text-indigo-300 font-bold hover:bg-white/10 hover:text-white rounded-xl transition-colors">
                  Ver relatório completo
                </Button>
              </div>
           </div>

           {/* Extrato Refinado */}
           <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-10">
                <div>
                   <h3 className="text-xl font-extrabold text-white tracking-tight">Histórico de Transações</h3>
                   <p className="text-sm font-medium text-slate-400 mt-1">Acompanhe suas movimentações recentes</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold h-10 px-4">Filtrar <ChevronRight className="w-4 h-4 ml-1 opacity-50" /></Button>
              </div>
              
              <div className="p-4 flex-1">
                <ul className="space-y-2">
                  {transactions?.map((tx) => (
                    <li key={tx.id} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl group cursor-pointer border border-transparent hover:border-white/10">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 border border-white/5 ${
                            tx.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {tx.type === 'credit' ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-base font-extrabold text-slate-200 group-hover:text-white transition-colors">{tx.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{tx.date}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="text-xs font-semibold text-slate-400">{tx.type === 'credit' ? 'Recebimento' : 'Pagamento via PIX'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-lg font-extrabold tracking-tight block ${
                            tx.type === 'credit' ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-slate-100'
                          }`}
                        >
                          {tx.type === 'credit' ? '+' : ''}{fmt(tx.amount)}
                        </span>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-baseline justify-end gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mb-0.5 shadow-[0_0_5px_rgba(16,185,129,0.8)]" /> Concluído
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-white/5 border-t border-white/10 text-center rounded-b-[2.5rem]">
                <Button variant="ghost" className="text-indigo-300 font-bold hover:bg-white/10 hover:text-white w-full h-12 rounded-[1.5rem] transition-colors">Carregar mais transações</Button>
              </div>
           </div>
        </div>

      </main>
    </div>
  )
}
