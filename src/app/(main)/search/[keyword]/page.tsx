'use client';
import { use } from 'react';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';

type Params = { params: Promise<{ keyword: string }> };

export default function Page({ params }: Params) {
    const { keyword } = use(params);
    const decodedKeyword = decodeURIComponent(keyword);

    const animeParams = new URLSearchParams({
        q: keyword,
        limit: '25',
        sfw: 'true',
    });

    const searchedAnime = useAnimeWithPagination('anime', animeParams);

    return (
        <main className='container'>
            <AnimeList
                animes={searchedAnime.animes?.data}
                loading={searchedAnime.loading}
                title={`Search for ${decodedKeyword} ..`}
                label='score'
            />
            <AnimePagination {...searchedAnime} />
        </main>
    );
}
