'use client';
import { cn } from '@/utils';
import { createPortal } from 'react-dom';
import { SearchInput } from './ButtonSearch';
import { useModalContext } from '@/context/modalContext';

export default function ModalSearch() {
    const { isOpen, isAnimate, modalRef } = useModalContext();

    return (
        isOpen &&
        createPortal(
            <div
                ref={modalRef}
                className={cn(
                    'fixed z-999 top-[100px] left-1/2 -translate-x-1/2 transition-all',
                    !isAnimate && '-translate-y-6 opacity-0'
                )}>
                <SearchInput />
            </div>,
            document.body
        )
    );
}
