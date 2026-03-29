import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock, Settings2, Plus, SmartphoneNfc } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FlipCard from '@/components/FlipCard'

export default function CardsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-rose-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <header className="relative z-40 bg-white/5 backdrop-blur-3xl border-b border-white/10 px-6 py-4 sticky top-0 shadow-lg shadow-black/20">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-rose-400" /> Meus Cartões
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 relative z-10 space-y-10 flex flex-col items-center">
        
        {/* Render the FlipCard inside a container */}
        <div className="scale-110 mt-8 mb-4">
           <FlipCard />
        </div>

        <div className="w-full space-y-4">
             <div className="flex items-center justify-between pb-4 border-b border-white/10">
                 <div>
                     <h3 className="text-slate-200 font-bold text-lg">Limite do Cartão</h3>
                     <p className="text-slate-400 text-sm">Disponível: R$ 12.500,00</p>
                 </div>
                 <Button variant="outline" className="border-rose-500/50 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-300 rounded-xl font-bold">
                    Ajustar
                 </Button>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-4">
                 <button className="bg-white/5 border border-white/10 p-4 rounded-[1.5rem] hover:bg-white/10 transition-colors flex items-center gap-4 text-left group">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-slate-200 font-bold text-sm">Bloquear</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Temporário</p>
                    </div>
                 </button>
                 <button className="bg-white/5 border border-white/10 p-4 rounded-[1.5rem] hover:bg-white/10 transition-colors flex items-center gap-4 text-left group">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                        <Settings2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-slate-200 font-bold text-sm">Configurar</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Senhas e limites</p>
                    </div>
                 </button>
             </div>
             
             <div className="pt-6 mt-6">
                 <button className="w-full bg-indigo-600 border mx-auto border-indigo-500/50 p-4 rounded-[1.5rem] hover:bg-indigo-500 transition-colors flex items-center justify-center gap-3 group shadow-lg shadow-indigo-600/20">
                    <SmartphoneNfc className="w-6 h-6 text-indigo-200 group-hover:text-white transition-colors" />
                    <span className="text-white font-bold text-base">Adicionar ao Apple Pay</span>
                 </button>
             </div>
             <div className="pt-2">
                 <button className="w-full bg-white/5 border border-dashed border-white/20 p-4 rounded-[1.5rem] hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-slate-400 hover:text-white border-dashed group">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Pedir cartão adicional</span>
                 </button>
             </div>
        </div>

      </main>
    </div>
  )
}
