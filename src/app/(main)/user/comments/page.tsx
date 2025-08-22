import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import UserComment from './components/UserComment';
import ButtonEdit from '../collections/components/ButtonEdit';
import CommentSectionTitle from './components/UserCommentTitle';

export default async function Page() {
    const session = await auth();
    if (!session) notFound();

    const comments = await prisma.comment.findMany({
        where: { userId: session.user?.id },
    });

    return (
        <section className='container'>
            <div className='flex items-center justify-between mb-4'>
                <CommentSectionTitle />
                <ButtonEdit api='/api/comments' />
            </div>
            {comments.length > 0 ? (
                <div className='w-full space-y-1'>
                    {comments
                        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                        .map((comment) => (
                            <UserComment key={comment.id} comment={comment} />
                        ))}
                </div>
            ) : (
                <div className='w-full flex items-center justify-center h-[70vh] text-sm text-neutral-400 text-center'>
                    <p>No comments yet.</p>
                </div>
            )}
        </section>
    );
}
