import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

function apiResponse(body: object, status: number) {
    return NextResponse.json(body, { status });
}

async function POST(req: Request) {
    const session = await auth();
    const { animeId, animeTitle, animeImage, text } = await req.json();
    if (!session || !session.user?.id)
        return apiResponse({ message: 'Unauthorized' }, 401);

    const comment = await prisma.comment.create({
        data: { userId: session.user?.id, animeId, animeTitle, animeImage, text },
    });
    return apiResponse(comment, 200);
}

async function DELETE(req: Request) {
    const session = await auth();
    const { selected } = await req.json();
    if (!session) return apiResponse({ message: 'Unauthorized' }, 401);

    try {
        await prisma.comment.deleteMany({
            where: { id: { in: selected }, userId: session?.user?.id },
        });
    } catch (err) {
        return apiResponse({ message: err }, 500);
    }
    return apiResponse({ message: 'Comment was deleted' }, 200);
}

export { apiResponse, POST, DELETE };
