'use client';
import { Suspense, use, useMemo } from 'react';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';

type Params = { params: Promise<{ keyword: string }> };

function AnimSearchSection({ keyword }: { keyword: string }) {
    const animeParams = useMemo(
        () => new URLSearchParams({ q: keyword, limit: '25', sfw: 'true' }),
        [keyword]
    );
    const searchedAnime = useAnimeWithPagination('anime', animeParams);

    return (
        <>
            <AnimeList
                animes={searchedAnime.animes?.data}
                loading={searchedAnime.loading}
                title={`Search for ${keyword} ..`}
                label='score'
            />
            <AnimePagination {...searchedAnime} />
        </>
    );
}

export default function Page({ params }: Params) {
    const { keyword } = use(params);
    const decodedKeyword = decodeURIComponent(keyword);
    return (
        <main className='container'>
            <Suspense>
                <AnimSearchSection keyword={decodedKeyword} />
            </Suspense>
        </main>
    );
}
