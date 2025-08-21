import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { Comment, InputComment } from './comments';
import { SingleAnimeType } from '@/types/anime';

export default async function AnimeComments({ anime }: { anime: SingleAnimeType }) {
    const session = await auth();
    const comments = await prisma.comment.findMany({
        where: { animeId: String(anime.mal_id) },
        select: {
            id: true,
            text: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });

    return (
        <div className='w-full'>
            <h2 className='text-xl font-semibold'>Comments ({comments.length})</h2>
            {session?.user?.id && (
                <InputComment
                    animeId={String(anime.mal_id)}
                    animeImage={anime.images.webp.image_url}
                    animeTitle={anime.title}
                    user={session.user}
                />
            )}
            <div className='space-y-1'>
                {comments
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                    .map((comment) => (
                        <Comment key={comment.id} {...comment} />
                    ))}
            </div>
        </div>
    );
}
