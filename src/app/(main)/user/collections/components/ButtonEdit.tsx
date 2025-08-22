'use client';
import { Edit2, Trash2, X } from 'lucide-react';
import Button from '@/components/button';
import { useCollectionEditContext } from '@/context/CollectionEditContext';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function ButtonEdit({ api }: { api: string }) {
    const { isEditMode, setEditMode, selected, setSelected } = useCollectionEditContext();
    const router = useRouter();

    async function handleDelete() {
        if (selected.length === 0) return;

        try {
            await fetch(api, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selected }),
            });
            console.log();
        } catch (err) {
            console.error('Failed to delete collections', err);
        }
        router.refresh();
        setEditMode(false);
        setSelected([]);
    }

    return isEditMode ? (
        <motion.div layout layoutId='main' className='flex items-center gap-2'>
            <motion.div layout>
                <Button
                    disabled={selected.length === 0}
                    onClick={handleDelete}
                    variants={{ variant: 'secondary', size: 'sm' }}
                    className='bg-red-300/10 text-red-400 disabled:bg-neutral-100, disabled:text-neutral-200'>
                    <Trash2 size={16} />
                    Delete
                </Button>
            </motion.div>
            <motion.div>
                <Button
                    onClick={() => setEditMode(false)}
                    variants={{ variant: 'none', size: 'none' }}
                    className='p-2'>
                    <X size={16} />
                </Button>
            </motion.div>
        </motion.div>
    ) : (
        <motion.div layout layoutId='main'>
            <motion.div layout='position'>
                <Button
                    onClick={() => setEditMode(true)}
                    variants={{ variant: 'secondary', size: 'sm' }}>
                    <Edit2 size={16} />
                    Edit
                </Button>
            </motion.div>
        </motion.div>
    );
}
