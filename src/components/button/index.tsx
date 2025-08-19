'use client';
import { ButtonHTMLAttributes, MouseEvent, useCallback, useRef, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import Ripple from './Ripple';
import { cn } from '@/utils';

const buttonVariants = cva('relative overflow-hidden', {
    variants: {
        variant: {
            primary: 'bg-amber-200 hover:bg-amber-300 text-neutral-800 transition-colors',
            secondary:
                ' bg-neutral-800/75 hover:bg-neutral-700/75 backdrop-blur-md transition-colors',
            outline: 'border border-neutral-700 bg-neutral-800/50 backdrop-blur-sm',
            danger: 'bg-red-100 hover:bg-red-200 text-red-800 disabled:bg-neutral-100 disabled:text-neutral-200 transition-colors',
            none: null,
        },
        size: {
            sm: 'text-xs p-2 px-3',
            md: 'text-sm p-3 px-5',
            lg: 'text-base p-4 px-6',
            none: null,
        },
        withBase: {
            false: null,
            true: '*:not-[.ripple]:z-1 flex items-center gap-2 font-semibold rounded-full disabled:opacity-50 disabled:pointer-events-none',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        withBase: true,
    },
});

type ButtonProps = {
    variants?: VariantProps<typeof buttonVariants>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variants, onClick, ...props }: ButtonProps) {
    const [ripples, setRipples] = useState<
        { id: number; x: number; y: number; size: number }[]
    >([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current) return;

            const id = Date.now();
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height);
            setRipples((prev) => [...prev, { id, x, y, size }]);

            if (onClick) {
                setTimeout(() => onClick(e), 100);
            }
        },
        [onClick]
    );

    function handleAnimationEnd(id: number) {
        setRipples((prev) => prev.filter((r) => r.id !== id));
    }

    return (
        <button
            {...props}
            ref={buttonRef}
            onClick={handleClick}
            className={cn(buttonVariants(variants), props.className)}>
            <Ripple ripples={ripples} onAnimationEnd={handleAnimationEnd} />
            {props.children}
        </button>
    );
}
