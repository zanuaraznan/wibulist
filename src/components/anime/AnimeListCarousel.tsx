'use client';
import Button from '../button';
import { Suspense, useEffect } from 'react';
import { SingleAnimeType } from '@/types/anime';
import { AnimeWithLoading } from './AnimeWithLoading';
import { HeaderLink, HeaderTitle } from './AnimeList';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimeWithPagination, useBreakpoint } from '@/hooks';
import { AnimeLabelProvider, useAnimeLabelContext } from '@/context/animeLabelContext';

type AnimeListCarouselType = {
    api: { url: string; queryParams?: Record<string, string> };
    link: string;
    title: string;
    limit?: number | { default: number; onBreak: number };
    label?: keyof SingleAnimeType;
};

export function AnimeListCarousel({ ...props }: AnimeListCarouselType) {
    return (
        <AnimeLabelProvider>
            <Suspense>
                <Main {...props} />
            </Suspense>
        </AnimeLabelProvider>
    );
}

function Main({ api, link, title, limit, label }: AnimeListCarouselType) {
    const isMobile = useBreakpoint();
    const { setAnimeLabel } = useAnimeLabelContext();

    const limitValue =
        typeof limit === 'number'
            ? limit ?? 3
            : isMobile
            ? limit?.default ?? 3
            : limit?.onBreak ?? 5;

    const updatedParams = new URLSearchParams({
        limit: String(limitValue),
        sfw: 'true',
        ...api.queryParams,
    });

    const {
        animes,
        loading,
        pagination: { page, increasePage, decreasePage },
    } = useAnimeWithPagination(api.url, updatedParams);

    useEffect(() => {
        if (!label) return;
        setAnimeLabel(label);
    }, [label, setAnimeLabel]);

    if (isMobile == null) return null;

    return (
        <section className='relative'>
            <div className='flex items-center justify-between mb-4'>
                <HeaderTitle title={title} />
                <HeaderLink link={link} />
            </div>
            <main className='relative overflow-hidden flex items-stretch gap-4 *:flex-1'>
                <AnimeWithLoading
                    animes={animes?.data}
                    loading={loading}
                    count={limitValue}
                />
            </main>
            <Button
                onClick={() => decreasePage()}
                variants={{ variant: 'secondary' }}
                disabled={page === 1 || loading}
                className='absolute -left-2 top-1/2 z-2 -translate-y-1/2'>
                <ChevronLeft size={18} />
            </Button>
            <Button
                onClick={() => increasePage()}
                variants={{ variant: 'secondary' }}
                disabled={!animes?.pagination?.has_next_page || loading}
                className='absolute -right-2 top-1/2 z-2 -translate-y-1/2'>
                <ChevronRight size={18} />
            </Button>
        </section>
    );
}
