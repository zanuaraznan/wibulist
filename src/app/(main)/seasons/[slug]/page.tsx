import { notFound } from 'next/navigation';
import SeasonsAnime from './components/SeasonsAnime';

export async function generateStaticParams() {
    return [{ slug: 'upcoming' }, { slug: 'now' }];
}

export default function Page({ params: { slug } }: { params: { slug: string } }) {
    const allowed = ['upcoming', 'now'];

    if (!allowed.includes(slug)) notFound();

    return <SeasonsAnime slug={slug} />;
}
