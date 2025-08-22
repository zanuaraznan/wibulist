'use client';
import Button from '@/components/button';
import { useCollectionEditContext } from '@/context/CollectionEditContext';
import { cn } from '@/utils';
import Link from 'next/link';

export default function UserCommentClient({
    commentId,
    children,
}: {
    commentId: string;
    children: React.ReactNode;
}) {
    const { isEditMode, selected, setSelected } = useCollectionEditContext();
    const isSelected = selected.includes(commentId);

    function handleClick() {
        if (!isEditMode) return;
        if (isSelected) {
            setSelected((prev) => prev.filter((id) => id !== commentId));
            return;
        }
        setSelected((prev) => [...prev, commentId]);
    }
    return (
        <Button
            onClick={handleClick}
            variants={{ variant: 'none', withBase: false, size: 'none' }}
            className={cn(
                '*:not-[.ripple]:z-1 w-full p-5 bg-neutral-800 flex gap-2 transition-all',
                isEditMode && 'rounded-4xl',
                isEditMode && !isSelected && 'opacity-50 scale-90 rounded-stack'
            )}>
            {children}
        </Button>
    );
}

export function RenderedComment({
    animeId,
    element,
}: {
    animeId: string;
    element: React.ReactElement;
}) {
    const { isEditMode } = useCollectionEditContext();

    return isEditMode ? (
        element
    ) : (
        <Link
            href={`/${animeId}`}
            className='block rounded-4xl rounded-stack overflow-hidden'>
            {element}
        </Link>
    );
}
