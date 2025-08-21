'use client';
import Button from '@/components/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ButtonDelete({ commentId }: { commentId: string }) {
    console.log(commentId);
    const router = useRouter();

    async function handleDelete() {
        try {
            await fetch('/api/comments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selected: [commentId] }),
            });
        } catch (err) {
            console.error('Failed to delete comment', err);
        }
        router.refresh();
    }
    return (
        <Button
            onClick={handleDelete}
            variants={{ variant: 'secondary', size: 'sm' }}
            className='bg-neutral-900 text-neutral-400'>
            <Trash2 size={16} />
        </Button>
    );
}
