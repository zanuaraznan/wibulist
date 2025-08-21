import Image from 'next/image';
import { getTimeAgo } from '@/utils';
import ButtonDelete from './ButtonDelete';
import { auth } from '@/lib/auth';

export type CommentProps = {
    id: string;
    text: string;
    createdAt: Date;
    user: {
        id: string;
        name: string;
        image: string | null;
    };
};

export async function Comment({ user, id, text, createdAt }: CommentProps) {
    const timeAgo = getTimeAgo(createdAt);
    const session = await auth();
    const isOwned = user.id === session?.user?.id;

    return (
        <div className='p-5 rounded-4xl bg-neutral-800 flex gap-4 transition-[border-radius] duration-500 ease-elastic rounded-stack'>
            <Image
                src={user.image ?? '/logo.png'}
                width={36}
                height={36}
                alt={user.name}
                className='bg-neutral-600 rounded-full size-[36px] object-cover shrink-0'
            />
            <div className='flex-1 text-left'>
                <p className='line-clamp-1 font-medium text-sm text-neutral-400'>
                    {user.name}
                </p>
                <p className='text-neutral-300'>{text}</p>
            </div>
            <div className='flex flex-col gap-2 items-end relative'>
                <p className='text-xs text-neutral-400 whitespace-nowrap'>{timeAgo}</p>
                {isOwned && <ButtonDelete commentId={id} />}
            </div>
        </div>
    );
}
