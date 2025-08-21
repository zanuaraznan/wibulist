'use client';

import { cn } from '@/utils';
import Button from '../button';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { CollectionType } from './AnimeDetail';
import { useSession } from 'next-auth/react';

type ButtonCollectionProps = {
    collection: CollectionType;
    anime: { id: string; image: string; title: string };
};

export function ButtonCollection({ collection, anime }: ButtonCollectionProps) {
    const [isCollection, setCollection] = useState(!!collection);
    const { data: session } = useSession();

    async function handleClick() {
        const res = await fetch('/api/collections', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                anime,
                userId: session?.user?.id,
            }),
        });

        if (res.ok) {
            setCollection((prev) => !prev);
        }
    }

    return (
        <Button
            onClick={handleClick}
            variants={{ variant: isCollection ? 'secondary' : 'primary', size: 'sm' }}
            className='my-4 whitespace-nowrap'>
            <Bookmark size={18} className={cn(isCollection && 'text-amber-300')} />
            {isCollection ? 'Remove collection' : 'Add collection'}
        </Button>
    );
}
