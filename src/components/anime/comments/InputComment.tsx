'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import Button from '../../button';
import { useRef, useState } from 'react';
import { SendHorizonal } from 'lucide-react';
import { useRouter } from 'next/navigation';

type InputCommentProps = {
    user: User;
    animeId: string;
    animeImage: string;
    animeTitle: string;
};

export function InputComment({
    user,
    animeId,
    animeImage,
    animeTitle,
}: InputCommentProps) {
    const [error, setError] = useState<string | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    function validateInput(value: string) {
        if (!value.trim()) return 'Cannot be empty';
        if (value.length > 255) return 'Comment above 255 characters';
        return null;
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    async function handleSubmit() {
        if (!textAreaRef.current) return;
        const { value } = textAreaRef.current;

        const errorMessage = validateInput(value);
        if (errorMessage) {
            textAreaRef.current.focus();
            setError(errorMessage);
            return;
        }
        setError(null);

        try {
            await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ animeId, animeImage, animeTitle, text: value }),
            });
        } catch (err) {
            console.error('Failed to post comment', err);
        }
        textAreaRef.current.value = '';
        textAreaRef.current.style.height = 'auto';

        router.refresh();
    }

    function handleOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className='flex items-start gap-2 w-full my-4'>
            <Image
                src={user.image ?? '/logo.png'}
                width={36}
                height={36}
                alt={user.name!}
                className='rounded-full bg-neutral-800'
            />
            <div className='w-full'>
                <textarea
                    ref={textAreaRef}
                    onFocus={() => setError(null)}
                    onChange={handleChange}
                    onKeyDown={handleOnEnter}
                    placeholder='Add your comments ...'
                    className='appearance-none w-full p-2 px-3 rounded-2xl bg-neutral-900 outline-2 outline-neutral-800 resize-none overflow-hidden'
                    rows={1}
                />
                {error && <p className='text-sm text-red-400'>{error}</p>}
            </div>
            <Button variants={{ variant: 'secondary' }} onClick={handleSubmit}>
                <SendHorizonal size={18} className='text-neutral-300' />
            </Button>
        </div>
    );
}
