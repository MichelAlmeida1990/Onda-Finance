import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Receipt, Link, QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChargePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-amber-500/30 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <header className="relative z-40 bg-white/5 backdrop-blur-3xl border-b border-white/10 px-6 py-4 sticky top-0 shadow-lg shadow-black/20">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-400" /> Cobrar
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 relative z-10 space-y-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-slate-400 font-medium text-sm">Cobrar amigos e clientes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Link de pagamento', icon: Link, desc: 'Envie por WhatsApp', action: () => alert('Mock: Gerar link') },
              { label: 'Cobrança via Pix', icon: QrCode, desc: 'QR Code específico', action: () => alert('Mock: Cobrança Pix') },
            ].map((it, idx) => (
              <button key={idx} onClick={it.action} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] hover:bg-white/10 hover:border-amber-500/50 transition-all flex flex-col items-center justify-center gap-4 text-center group ring-1 ring-white/5 shadow-2xl shadow-black/40">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors group-hover:scale-110">
                  <it.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-bold text-base">{it.label}</h3>
                  <p className="text-slate-500 text-sm mt-1">{it.desc}</p>
                </div>
              </button>
            ))}
        </div>
      </main>
    </div>
  )
}
