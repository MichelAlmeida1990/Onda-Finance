import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ComingSoonPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Extract path name to show what is coming soon
  const origin = location.pathname.split('/')[1] || 'Recurso'
  const titleMap: Record<string, string> = {
    'pagar': 'Pagamentos',
    'depositar': 'Depósitos',
    'cobrar': 'Cobrar',
    'investir': 'Investimentos'
  }
  const displayTitle = titleMap[origin] || 'Em Breve'

  return (
    <div className="min-h-screen bg-[#020617] font-sans flex flex-col">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
      </div>

      <header className="relative z-40 px-6 py-4 sticky top-0">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pb-20 text-center">
         <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/10">
            <Clock className="w-10 h-10 text-indigo-400" />
         </div>
         <h1 className="text-3xl font-extrabold text-white tracking-tight mb-4 flex items-center gap-3">
             {displayTitle}
         </h1>
         <p className="text-slate-400 text-lg max-w-sm mx-auto font-medium">
             Estamos finalizando os preparativos. Esta funcionalidade incrível estará disponível em breve!
         </p>
         
         <Button onClick={() => navigate('/dashboard')} className="mt-10 h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 animate-bounce rounded-xl shadow-lg shadow-indigo-500/30">
             Voltar ao Início
         </Button>
      </main>
    </div>
  )
}
