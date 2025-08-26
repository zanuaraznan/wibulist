'use client';

import { Suspense, useMemo } from 'react';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';
import { defaultAnimeParams } from '../top/[filter]/components/TopAnimePagination';

function AnimeMoviesSection() {
    const animeMoviesParams = useMemo(
        () =>
            new URLSearchParams({
                ...Object.fromEntries(defaultAnimeParams),
                type: 'movie',
            }),
        []
    );

    const animeMovies = useAnimeWithPagination('anime', animeMoviesParams);

    return (
        <>
            <AnimeList
                animes={animeMovies.animes?.data}
                loading={animeMovies.loading}
                title='Anime movies'
                label='score'
            />
            <AnimePagination {...animeMovies} />
        </>
    );
}

export default function Page() {
    return (
        <main className='container'>
            <Suspense>
                <AnimeMoviesSection />
            </Suspense>
        </main>
    );
}
