'use client';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';
import { defaultAnimeParams } from '@/app/(main)/top/[filter]/components/TopAnimePagination';

export default function SeasonsAnime({ slug }: { slug: string }) {
    const seasonsAnime = useAnimeWithPagination(`seasons/${slug}`, defaultAnimeParams);

    return (
        <main className='container'>
            <AnimeList
                animes={seasonsAnime.animes?.data}
                loading={seasonsAnime.loading}
                title={
                    slug === 'now' ? 'Currently airing animes' : 'Upcoming season animes'
                }
                label='score'
            />
            <AnimePagination {...seasonsAnime} />
        </main>
    );
}
