import Image from 'next/image';
import { getTimeAgo } from '@/utils';
import { Comment as CommentType } from '@prisma/client';
import UserCommentClient, { RenderedComment } from './UserCommentClient';

export default function UserComment({ comment }: { comment: CommentType }) {
    const { animeId, animeImage, animeTitle, id, text, createdAt } = comment;
    const timeAgo = getTimeAgo(createdAt);

    const card = (
        <UserCommentClient commentId={id}>
            <Image
                src={animeImage}
                width={36}
                height={36}
                alt={animeTitle}
                className='bg-neutral-600 rounded-full size-[36px] object-cover shrink-0'
            />
            <div className='flex-1 text-left'>
                <p className='line-clamp-1 font-medium text-sm text-neutral-400'>
                    {animeTitle}
                </p>
                <p className='text-neutral-300'>{text}</p>
            </div>
            <div className='flex flex-col gap-2 items-end relative'>
                <p className='text-xs text-neutral-400 whitespace-nowrap'>{timeAgo}</p>
            </div>
        </UserCommentClient>
    );

    return <RenderedComment animeId={animeId} element={card} />;
}
