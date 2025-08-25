import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/utils';

async function POST(req: Request) {
    const session = await auth();
    if (!session) return apiResponse({ message: 'Unauthorized' }, 401);

    const { anime, userId } = await req.json();
    const { id, image, title } = anime;

    const existing = await prisma.collection.findUnique({
        where: { animeId_userId: { animeId: id, userId } },
    });

    if (existing) {
        await prisma.collection.delete({
            where: { animeId_userId: { animeId: id, userId } },
        });
        return apiResponse({ message: 'Collection deleted' }, 200);
    } else {
        await prisma.collection.create({
            data: { animeId: id, animeImage: image, animeTitle: title, userId },
        });
        return apiResponse({ message: 'Collection added' }, 200);
    }
}

async function DELETE(req: Request) {
    const session = await auth();
    if (!session) return apiResponse({ message: 'Unauthorized' }, 401);

    const { selected } = await req.json();

    if (!Array.isArray(selected) || selected.some((id) => typeof id !== 'string')) {
        return apiResponse({ message: 'Invalid request body' }, 400);
    }

    await prisma.collection.deleteMany({
        where: { userId: session.user?.id, id: { in: selected } },
    });

    return apiResponse({ message: 'Collection(s) deleted' }, 200);
}

export { POST, DELETE };
