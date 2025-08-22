'use client';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';
import { defaultAnimeParams } from '../top/[filter]/components/TopAnimePagination';

export default function Page() {
    const animeMoviesParams = new URLSearchParams({
        ...Object.fromEntries(defaultAnimeParams),
        type: 'movie',
    });

    const animeMovies = useAnimeWithPagination('anime', animeMoviesParams);

    return (
        <main className='container'>
            <AnimeList
                animes={animeMovies.animes?.data}
                loading={animeMovies.loading}
                title='Anime movies'
                label='score'
            />
            <AnimePagination {...animeMovies} />
        </main>
    );
}
