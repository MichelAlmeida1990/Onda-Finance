import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function ComingSoonPage() {
    const navigate = useNavigate();
    const location = useLocation();
    // Extract path name to show what is coming soon
    const origin = location.pathname.split('/')[1] || 'Recurso';
    const titleMap = {
        'pagar': 'Pagamentos',
        'depositar': 'Depósitos',
        'cobrar': 'Cobrar',
        'investir': 'Investimentos'
    };
    const displayTitle = titleMap[origin] || 'Em Breve';
    return (_jsxs("div", { className: "min-h-screen bg-[#020617] font-sans flex flex-col", children: [_jsx("div", { className: "absolute inset-0 z-0 overflow-hidden pointer-events-none", children: _jsx("div", { className: "absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" }) }), _jsx("header", { className: "relative z-40 px-6 py-4 sticky top-0", children: _jsx("div", { className: "max-w-2xl mx-auto", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/dashboard'), className: "text-slate-300 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }) }) }), _jsxs("main", { className: "flex-1 flex flex-col items-center justify-center relative z-10 px-6 pb-20 text-center", children: [_jsx("div", { className: "w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/10", children: _jsx(Clock, { className: "w-10 h-10 text-indigo-400" }) }), _jsx("h1", { className: "text-3xl font-extrabold text-white tracking-tight mb-4 flex items-center gap-3", children: displayTitle }), _jsx("p", { className: "text-slate-400 text-lg max-w-sm mx-auto font-medium", children: "Estamos finalizando os preparativos. Esta funcionalidade incr\u00EDvel estar\u00E1 dispon\u00EDvel em breve!" }), _jsx(Button, { onClick: () => navigate('/dashboard'), className: "mt-10 h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 animate-bounce rounded-xl shadow-lg shadow-indigo-500/30", children: "Voltar ao In\u00EDcio" })] })] }));
}
