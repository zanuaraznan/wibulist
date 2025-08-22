import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ButtonEdit from './components/ButtonEdit';
import CollectionSectionTitle from './components/CollectionSectionTitle';
import Collection from './components/Collection';

export default async function Page() {
    const session = await auth();
    if (!session) notFound();

    const collections = await prisma.collection.findMany({
        where: { userId: session.user?.id },
    });

    return (
        <section className='container'>
            <div className='flex items-center justify-between mb-4'>
                <CollectionSectionTitle />
                <ButtonEdit api='/api/collections' />
            </div>
            {collections.length > 0 ? (
                <div className='w-full grid grid-cols-3 md:grid-cols-5 gap-4'>
                    {collections.map((collection) => (
                        <Collection key={collection.id} collection={collection} />
                    ))}
                </div>
            ) : (
                <div className='w-full flex items-center justify-center h-[70vh] text-sm text-neutral-400 text-center'>
                    <p>There is no collection here. Try to add them from anime details</p>
                </div>
            )}
        </section>
    );
}
