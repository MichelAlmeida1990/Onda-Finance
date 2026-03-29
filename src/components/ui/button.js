import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
const buttonVariants = cva('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-primary text-white hover:bg-indigo-600',
            outline: 'border border-border bg-white hover:bg-muted text-foreground',
            ghost: 'hover:bg-muted text-foreground',
            destructive: 'bg-destructive text-white hover:bg-red-600',
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-8 px-3 text-xs',
            lg: 'h-12 px-6 text-base',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: { variant: 'default', size: 'default' },
});
const Button = forwardRef(({ className, variant, size, ...props }, ref) => (_jsx("button", { ref: ref, className: cn(buttonVariants({ variant, size, className })), ...props })));
Button.displayName = 'Button';
export { Button, buttonVariants };
