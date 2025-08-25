import { notFound } from 'next/navigation';
import SeasonsAnime from './components/SeasonsAnime';

export async function generateStaticParams() {
    return [{ slug: 'upcoming' }, { slug: 'now' }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const allowed = ['upcoming', 'now'];

    if (!allowed.includes(slug)) notFound();

    return <SeasonsAnime slug={slug} />;
}
