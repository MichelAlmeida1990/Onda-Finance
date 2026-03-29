import { useState } from 'react'
import { Waves } from 'lucide-react'

export default function FlipCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-80 h-48 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRENTE */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-6 shadow-2xl shadow-black/50 group-hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.7)] flex flex-col justify-between border border-white/20 group-hover:border-white/40 transition-all duration-500 ${flipped ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
        >
          {/* subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px'}} />
          
          <div className="relative flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
                <Waves className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">Onda Finance</span>
            </div>
            {/* chip */}
            <div className="w-10 h-7 rounded-md bg-yellow-400/80 flex items-center justify-center">
              <div className="w-6 h-4 rounded-sm border border-yellow-600/40 grid grid-cols-2 gap-px p-0.5">
                <div className="bg-yellow-600/30 rounded-sm" />
                <div className="bg-yellow-600/30 rounded-sm" />
                <div className="bg-yellow-600/30 rounded-sm" />
                <div className="bg-yellow-600/30 rounded-sm" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-white/60 text-sm tracking-[0.2em] font-mono">•••• •••• •••• 4821</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Titular</p>
              <p className="text-white font-semibold text-sm tracking-wide">JOÃO SILVA</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Validade</p>
              <p className="text-white font-semibold text-sm">12/28</p>
            </div>
            {/* mastercard logo */}
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="12" r="7" fill="#EB001B" opacity="0.85" />
              <circle cx="16" cy="12" r="7" fill="#F79E1B" opacity="0.85" />
              <path d="M12 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 12 6.8z" fill="#FF5F00" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* VERSO */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-[#020617] shadow-xl group-hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)] flex flex-col justify-between border border-white/10 group-hover:border-white/30 overflow-hidden transition-all duration-500"
        >
          {/* tarja magnética */}
          <div className="w-full h-10 bg-slate-950 mt-6" />

          <div className="px-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-8 bg-slate-200 rounded flex items-center justify-end px-3">
                <span className="text-slate-900 font-mono font-bold text-sm tracking-widest">•••</span>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[10px] uppercase tracking-wider">CVV</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Limite disponível</p>
                <p className="text-white font-bold text-base">R$ 12.500,00</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center border border-white/5">
                  <Waves className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/60 font-bold tracking-wide text-[10px] uppercase">Onda Finance</span>
              </div>
            </div>
          </div>

          <p className="text-white/20 text-[9px] text-center pb-3 px-4">
            Este cartão é de uso exclusivo do titular. Em caso de perda ou roubo, bloqueie pelo app.
          </p>
        </div>
      </div>
    </div>
  )
}
