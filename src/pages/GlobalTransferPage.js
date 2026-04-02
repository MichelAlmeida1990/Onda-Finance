import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, TrendingUp, Send, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const globalTransferSchema = z.object({
    fromCountry: z.string().min(1, 'Selecione o país de origem'),
    toCountry: z.string().min(1, 'Selecione o país de destino'),
    fromCurrency: z.string().min(1, 'Selecione a moeda de origem'),
    toCurrency: z.string().min(1, 'Selecione a moeda de destino'),
    amount: z.coerce.number().min(10, 'Valor mínimo de $10').max(50000, 'Valor máximo de $50,000'),
    recipient: z.string().min(3, 'Nome do destinatário obrigatório'),
    email: z.string().email('E-mail inválido'),
    transferType: z.enum(['fiat', 'crypto']),
});
const countries = [
    { code: 'US', name: 'Estados Unidos', currency: 'USD', flag: '🇺🇸' },
    { code: 'BR', name: 'Brasil', currency: 'BRL', flag: '🇧🇷' },
    { code: 'GB', name: 'Reino Unido', currency: 'GBP', flag: '🇬🇧' },
    { code: 'EU', name: 'União Europeia', currency: 'EUR', flag: '🇪🇺' },
    { code: 'JP', name: 'Japão', currency: 'JPY', flag: '🇯🇵' },
    { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
    { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽' },
    { code: 'CA', name: 'Canadá', currency: 'CAD', flag: '🇨🇦' },
];
const cryptoCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', icon: '₮' },
    { symbol: 'USDC', name: 'USD Coin', icon: '$' },
];
export default function GlobalTransferPage() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting }, } = useForm({ resolver: zodResolver(globalTransferSchema) });
    const watchedValues = watch();
    const { fromCurrency, toCurrency, amount, transferType } = watchedValues;
    // Simular taxa de câmbio
    const calculateExchangeRate = () => {
        if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
            // Taxas simuladas
            const rates = {
                'USD-BRL': 5.2,
                'BRL-USD': 0.192,
                'USD-EUR': 0.92,
                'EUR-USD': 1.087,
                'USD-GBP': 0.79,
                'GBP-USD': 1.27,
                'BTC-USD': 45000,
                'ETH-USD': 3000,
            };
            const key = `${fromCurrency}-${toCurrency}`;
            setExchangeRate(rates[key] || 1);
        }
        else {
            setExchangeRate(1);
        }
    };
    const onSubmit = async (data) => {
        setProcessing(true);
        await new Promise((r) => setTimeout(r, 2000));
        setProcessing(false);
        setSuccess(true);
    };
    const convertedAmount = amount ? (amount * exchangeRate).toFixed(2) : '0.00';
    if (success) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center", children: [_jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Send, { className: "w-10 h-10 text-green-600" }) }), _jsx("h2", { className: "text-3xl font-bold text-slate-900 mb-4", children: "Transfer\u00EAncia Global Enviada!" }), _jsxs("p", { className: "text-slate-600 mb-6", children: [amount, " ", fromCurrency, " \u2192 ", convertedAmount, " ", toCurrency] }), _jsxs("div", { className: "bg-slate-50 rounded-2xl p-4 mb-6", children: [_jsx("p", { className: "text-sm text-slate-500 mb-1", children: "Taxa de c\u00E2mbio" }), _jsxs("p", { className: "text-2xl font-bold text-slate-900", children: ["1 ", fromCurrency, " = ", exchangeRate, " ", toCurrency] })] }), _jsx(Button, { onClick: () => navigate('/dashboard'), className: "w-full bg-blue-600 hover:bg-blue-700 text-white", children: "Voltar ao Dashboard" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900", children: _jsxs("div", { className: "max-w-4xl mx-auto p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsx(Button, { onClick: () => navigate('/dashboard'), variant: "ghost", className: "text-white hover:bg-white/10", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-white flex items-center gap-3", children: [_jsx(Globe, { className: "w-8 h-8 text-blue-400" }), "Transfer\u00EAncia Global"] }), _jsx("p", { className: "text-slate-400", children: "Envie dinheiro para qualquer lugar do mundo" })] })] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx("div", { className: "bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-3 block", children: "Tipo de Transfer\u00EAncia" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("button", { type: "button", onClick: () => setValue('transferType', 'fiat'), className: cn("p-4 rounded-2xl border-2 transition-all", transferType === 'fiat'
                                                                ? "border-blue-400 bg-blue-400/20 text-white"
                                                                : "border-white/20 text-white/70 hover:border-white/40"), children: [_jsx(TrendingUp, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("span", { className: "font-medium", children: "Moeda Fiduci\u00E1ria" })] }), _jsxs("button", { type: "button", onClick: () => setValue('transferType', 'crypto'), className: cn("p-4 rounded-2xl border-2 transition-all", transferType === 'crypto'
                                                                ? "border-blue-400 bg-blue-400/20 text-white"
                                                                : "border-white/20 text-white/70 hover:border-white/40"), children: [_jsx(Shield, { className: "w-6 h-6 mx-auto mb-2" }), _jsx("span", { className: "font-medium", children: "Criptomoeda" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "De" }), _jsxs("select", { ...register('fromCountry'), className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "Selecione o pa\u00EDs" }), countries.map(country => (_jsxs("option", { value: country.code, children: [country.flag, " ", country.name] }, country.code)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "Para" }), _jsxs("select", { ...register('toCountry'), className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "Selecione o pa\u00EDs" }), countries.map(country => (_jsxs("option", { value: country.code, children: [country.flag, " ", country.name] }, country.code)))] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "Moeda de Origem" }), _jsxs("select", { ...register('fromCurrency'), onChange: (e) => {
                                                                setValue('fromCurrency', e.target.value);
                                                                calculateExchangeRate();
                                                            }, className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "Selecione" }), transferType === 'crypto' ? (cryptoCurrencies.map(crypto => (_jsxs("option", { value: crypto.symbol, children: [crypto.icon, " ", crypto.name, " (", crypto.symbol, ")"] }, crypto.symbol)))) : (Array.from(new Set(countries.map(c => c.currency))).map(currency => (_jsx("option", { value: currency, children: currency }, currency))))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "Moeda de Destino" }), _jsxs("select", { ...register('toCurrency'), onChange: (e) => {
                                                                setValue('toCurrency', e.target.value);
                                                                calculateExchangeRate();
                                                            }, className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:border-blue-400 focus:outline-none", children: [_jsx("option", { value: "", children: "Selecione" }), transferType === 'crypto' ? (cryptoCurrencies.map(crypto => (_jsxs("option", { value: crypto.symbol, children: [crypto.icon, " ", crypto.name, " (", crypto.symbol, ")"] }, crypto.symbol)))) : (Array.from(new Set(countries.map(c => c.currency))).map(currency => (_jsx("option", { value: currency, children: currency }, currency))))] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "Valor a Transferir" }), _jsx("input", { type: "number", ...register('amount'), placeholder: "0.00", onChange: (e) => {
                                                        setValue('amount', parseFloat(e.target.value));
                                                        calculateExchangeRate();
                                                    }, className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none" }), errors.amount && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.amount.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "Nome do Destinat\u00E1rio" }), _jsx("input", { ...register('recipient'), placeholder: "Nome completo", className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none" }), errors.recipient && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.recipient.message })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-medium mb-2 block", children: "E-mail do Destinat\u00E1rio" }), _jsx("input", { ...register('email'), type: "email", placeholder: "email@exemplo.com", className: "w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none" }), errors.email && _jsx("p", { className: "text-red-400 text-sm mt-1", children: errors.email.message })] }), _jsx(Button, { type: "submit", disabled: processing, className: "w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-lg transition-all", children: processing ? (_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Processando..."] })) : (`Transferir ${amount || '0.00'} ${fromCurrency || ''}`) })] }) }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20", children: [_jsxs("h3", { className: "text-white font-semibold mb-4 flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5 text-blue-400" }), "Taxa de C\u00E2mbio"] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-white", children: [_jsxs("span", { children: ["1 ", fromCurrency || '---'] }), _jsxs("span", { className: "font-mono", children: [exchangeRate, " ", toCurrency || '---'] })] }), _jsxs("div", { className: "flex justify-between text-white pt-3 border-t border-white/20", children: [_jsx("span", { children: "Valor a receber" }), _jsxs("span", { className: "font-mono text-xl font-bold", children: [convertedAmount, " ", toCurrency || ''] })] })] })] }), _jsxs("div", { className: "bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20", children: [_jsxs("h3", { className: "text-white font-semibold mb-4 flex items-center gap-2", children: [_jsx(Shield, { className: "w-5 h-5 text-blue-400" }), "Por que escolher Onda Finance?"] }), _jsxs("ul", { className: "space-y-3 text-white/80 text-sm", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: "Taxas at\u00E9 80% mais baratas que bancos tradicionais" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: "Entrega em minutos para 180+ pa\u00EDses" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: "Prote\u00E7\u00E3o contra fraudes com blockchain" })] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" }), _jsx("span", { children: "Suporte 24/7 em 10 idiomas" })] })] })] }), _jsx("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6", children: _jsxs("div", { className: "flex items-center gap-3 text-white", children: [_jsx(Clock, { className: "w-6 h-6" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Entrega R\u00E1pida" }), _jsx("p", { className: "text-sm text-white/80", children: "5-30 minutos" })] })] }) })] })] })] }) }));
}
