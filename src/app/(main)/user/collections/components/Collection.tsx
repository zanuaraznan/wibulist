'use client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/button';
import { Collection as CollectionType } from '@prisma/client';
import { useCollectionEditContext } from '@/context/CollectionEditContext';
import { cn } from '@/utils';

export default function Collection({ collection }: { collection: CollectionType }) {
    const { animeId, id, animeImage, animeTitle } = collection;
    const { isEditMode, selected, setSelected } = useCollectionEditContext();

    const isSelected = selected.includes(id);

    function handleClick() {
        if (!isEditMode) return;
        if (isSelected) {
            setSelected((prev) => prev.filter((currentId) => currentId !== id));
            return;
        }
        setSelected((prev) => [...prev, id]);
    }

    const card = (
        <Button
            onClick={handleClick}
            variants={{ variant: 'none', withBase: false, size: 'none' }}
            className={cn(
                'relative rounded-xl flex flex-col gap-2 text-left w-full transition-all',
                isEditMode &&
                    !isSelected &&
                    'opacity-50 scale-90 wiggle select-icon selected-icon'
            )}>
            <div className='relative aspect-3/4 shrink-0 -z-5 rounded-xl overflow-hidden'>
                <Image
                    width={300}
                    height={400}
                    src={animeImage}
                    alt={animeTitle}
                    className='object-cover w-full h-full'
                />
            </div>
            <p className='font-medium text-sm line-clamp-2 text-neutral-200'>
                {animeTitle}
            </p>
        </Button>
    );

    return isEditMode ? card : <Link href={`/${animeId}`}>{card}</Link>;
}
