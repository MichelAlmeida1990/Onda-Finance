import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
const Input = forwardRef(({ className, ...props }, ref) => (_jsx("input", { ref: ref, className: cn('flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50', className), ...props })));
Input.displayName = 'Input';
export { Input };
