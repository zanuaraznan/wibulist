'use client';
import { useAnimeWithPagination } from '@/hooks';
import { AnimeList, AnimePagination } from '@/components/anime';
import { Suspense } from 'react';

export const defaultAnimeParams = new URLSearchParams({
    limit: '25',
    sfw: 'true',
});

type TopAnimePaginationProps = {
    filter: string;
    headerCustom: React.ReactNode;
};

function TopAnimePaginationSection({ filter, headerCustom }: TopAnimePaginationProps) {
    const topAnimeParams = new URLSearchParams(defaultAnimeParams.toString());

    if (filter !== 'all') {
        topAnimeParams.set('filter', filter);
    } else {
        topAnimeParams.delete('filter');
    }

    const topAnime = useAnimeWithPagination('top/anime', topAnimeParams);
    return (
        <>
            <AnimeList
                animes={topAnime.animes?.data}
                loading={topAnime.loading}
                headerMenu={{
                    type: 'custom',
                    custom: headerCustom,
                }}
                title='Most popular animes'
                label='score'
            />
            <AnimePagination {...topAnime} />
        </>
    );
}

export default function TopAnimePagination({ ...props }: TopAnimePaginationProps) {
    return (
        <Suspense>
            <TopAnimePaginationSection {...props} />
        </Suspense>
    );
}
