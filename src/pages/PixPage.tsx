import { useNavigate } from 'react-router-dom'
import { ArrowLeft, QrCode, ScanLine, Copy, Search, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PixPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-teal-500/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-sky-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <header className="relative z-40 bg-white/5 backdrop-blur-3xl border-b border-white/10 px-6 py-4 sticky top-0 shadow-lg shadow-black/20">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <QrCode className="w-5 h-5 text-teal-400" /> Área Pix
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 relative z-10 space-y-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-slate-400 font-medium text-sm">Transferências rápidas e seguras</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Pagar com QR Code', icon: ScanLine, desc: 'Use a câmera', action: () => alert('Mock: Abrir câmera') },
              { label: 'Pix Copia e Cola', icon: Copy, desc: 'Cole o código', action: () => alert('Mock: Copia e cola') },
              { label: 'Ler código de barras', icon: Search, desc: 'Boletos', action: () => alert('Mock: Código de barras') },
              { label: 'Chave Pix', icon: Key, desc: 'CPF/CNPJ, E-mail...', action: () => navigate('/transfer') },
            ].map((it, idx) => (
              <button key={idx} onClick={it.action} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 hover:border-teal-500/50 transition-all flex flex-col items-center justify-center gap-4 text-center group ring-1 ring-white/5 shadow-2xl shadow-black/40">
                <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors group-hover:scale-110">
                  <it.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-slate-200 font-bold text-sm">{it.label}</h3>
                  <p className="text-slate-500 text-xs mt-1">{it.desc}</p>
                </div>
              </button>
            ))}
        </div>

        <div className="mt-8 bg-gradient-to-tr from-teal-900/40 to-slate-900/50 border border-teal-500/20 p-6 rounded-[2rem] shadow-xl relative overflow-hidden backdrop-blur-xl group">
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-teal-500/20 blur-[40px] rounded-full group-hover:bg-teal-400/30 transition-colors" />
             <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h4 className="text-slate-200 font-bold mb-1">Minhas chaves</h4>
                    <p className="text-sm text-slate-400">Gerencie suas chaves Pix</p>
                </div>
                <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl px-6">
                  Configurar
                </Button>
             </div>
        </div>
      </main>
    </div>
  )
}
