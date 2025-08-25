'use client';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';
import { defaultAnimeParams } from '@/app/(main)/top/[filter]/components/TopAnimePagination';
import { Suspense } from 'react';

interface Slug {
    slug: string;
}

function SeasonsAnimeSection({ slug }: Slug) {
    const seasonsAnime = useAnimeWithPagination(`seasons/${slug}`, defaultAnimeParams);

    return (
        <>
            <AnimeList
                animes={seasonsAnime.animes?.data}
                loading={seasonsAnime.loading}
                title={
                    slug === 'now' ? 'Currently airing animes' : 'Upcoming season animes'
                }
                label='score'
            />
            <AnimePagination {...seasonsAnime} />
        </>
    );
}

export default function SeasonsAnime({ slug }: Slug) {
    return (
        <main className='container'>
            <Suspense>
                <SeasonsAnimeSection slug={slug} />
            </Suspense>
        </main>
    );
}
