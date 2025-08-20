'use client';
import Link from 'next/link';
import Button from '../button';
import { useBreakpoint } from '@/hooks';
import { HeaderLink, HeaderTitle } from './AnimeList';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, getMergedGenres, queuedFetch } from '@/utils';
import React, { useEffect, useState } from 'react';
import { AnimeDataType, AnimePaginationType, SingleAnimeType } from '@/types/anime';
import { motionConfig, motionConfigWithoutInitial } from './AnimeWithLoading';
import Image from 'next/image';

function TopAnime({ anime }: { anime: SingleAnimeType }) {
    const genres = getMergedGenres(anime);
    const PER_GENRE = 3;

    return (
        <motion.div
            key={anime.mal_id}
            layout
            {...motionConfig}
            className='w-full md:h-full flex flex-row items-stretch gap-4 p-4 rounded-2xl border-2 border-neutral-800'>
            <div className='flex-[2] relative rounded-xl overflow-hidden'>
                <div className='absolute top-0 right-0 z-5 font-semibold p-2 rounded-bl-xl bg-neutral-800 flex items-center gap-2 text-sm'>
                    {anime.score}
                    <span>⭐</span>
                </div>
                <Image
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    width={300}
                    height={400}
                    className='absolute object-cover h-full w-full'
                />
                <div className='p-2 pt-4 bg-linear-0 from-neutral-800 to-transparent text-xs bottom-0 inset-x-0 absolute font-semibold'>
                    <p className='line-clamp-2 px-2 border-l-2 border-white'>
                        {anime.rating}
                    </p>
                </div>
            </div>
            <div className='flex-3 space-y-2'>
                <p className='text-sm p-1 px-3 rounded-lg border border-neutral-700 w-fit text-amber-200'>
                    {anime.status}
                </p>
                <p className='text-sm flex items-center flex-wrap gap-2 bullet-list'>
                    <span>{anime.type}</span>
                    <span>{anime.episodes ?? '-'} Episode(s)</span>
                    {anime.type.toLowerCase() === 'movie' && (
                        <>
                            <span>{anime.duration}</span>
                        </>
                    )}
                    {(anime.season != null || anime.year != null) && (
                        <span className='capitalize'>
                            {anime.season} {anime.year}
                        </span>
                    )}
                </p>
                <h2 className='text-lg font-semibold my-4 line-clamp-2'>{anime.title}</h2>
                <div className='flex gap-2 flex-wrap'>
                    {genres.slice(0, PER_GENRE).map((genre) => (
                        <Button
                            key={genre.mal_id}
                            variants={{ variant: 'outline', size: 'sm' }}
                            className='bg-neutral-800'>
                            {genre.name}
                        </Button>
                    ))}
                    {genres.length > PER_GENRE && (
                        <Button variants={{ variant: 'outline', size: 'sm' }}>
                            {genres.length - PER_GENRE} +
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function TopAnimeList({
    limit,
}: {
    limit?: number | { default: number; onBreak: number };
}) {
    const [topAnime, setTopAnime] = useState<AnimeDataType>([]);
    const [pagination, setPagination] = useState<AnimePaginationType | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const isMobile = useBreakpoint();

    const limitValue =
        typeof limit === 'number'
            ? limit ?? 3
            : isMobile
            ? limit?.default ?? 1
            : limit?.onBreak ?? 2;

    useEffect(() => {
        const isDocumentVisible = document.visibilityState === 'visible';
        let timeout: ReturnType<typeof setTimeout>;

        if (isMobile == null) return;

        async function fetchTopAnime() {
            try {
                setLoading(true);
                const anime = await queuedFetch(
                    `top/anime?limit=${limitValue}&filter=airing&page=${page}&sfw=true`
                );

                setTopAnime(anime.data);
                setPagination(anime.pagination);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchTopAnime();

        function startTimer() {
            timeout = setTimeout(() => setPage((prev) => prev + 1), 10000);
        }

        function clearTimer() {
            if (timeout) clearTimeout(timeout);
        }

        if (isDocumentVisible) {
            startTimer();
        }

        function handleVisibilityChange() {
            if (isDocumentVisible) {
                startTimer();
            } else {
                clearTimer();
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [page, isMobile, limitValue]);

    if (isMobile == null) return null;

    return (
        <section className='relative'>
            <div className='flex items-center justify-between mb-2'>
                <HeaderTitle title='Top airing' />
                <HeaderLink link='/top/airing' />
            </div>

            <main className='relative overflow-hidden flex items-stretch gap-8 flex-nowrap'>
                <div className='absolute pointer-events-none inset-0 bg-[linear-gradient(90deg,_var(--color-neutral-900),_transparent_20%,_transparent_80%,_var(--color-neutral-900))] z-1' />
                <AnimatePresence mode='popLayout'>
                    {topAnime && topAnime.length > 0 && !loading
                        ? topAnime.map((anime) => (
                              <Link
                                  key={anime.mal_id}
                                  href={`/${anime.mal_id}`}
                                  className='w-full'>
                                  <TopAnime anime={anime} />
                              </Link>
                          ))
                        : Array.from({ length: limitValue }).map((_, id) => (
                              <motion.div
                                  key={id}
                                  className='w-full aspect-3/2 md:aspect-3/1 rounded-2xl border-2 border-neutral-800'
                                  {...motionConfigWithoutInitial}>
                                  <div className='skeleton-loading' />
                              </motion.div>
                          ))}
                </AnimatePresence>
            </main>

            <Button
                onClick={() => setPage((prev) => prev - 1)}
                variants={{ variant: 'secondary' }}
                disabled={page === 1 || loading}
                className='absolute -left-2 top-1/2 z-2 -translate-y-1/2'>
                <ChevronLeft size={18} />
            </Button>
            <Button
                onClick={() => setPage((prev) => prev + 1)}
                variants={{ variant: 'secondary' }}
                disabled={!pagination?.has_next_page || loading}
                className='absolute -right-2 top-1/2 z-2 -translate-y-1/2'>
                <ChevronRight size={18} />
            </Button>
            <div className='w-full p-3 flex justify-center items-center gap-1'>
                {Array.from({ length: 3 }).map((_, id) => (
                    <div
                        key={id}
                        className={cn(
                            'size-[6px] bg-neutral-700 rounded-full transition-transform',
                            id === (page - 1) % 3 && 'scale-150 mx-[2px] bg-neutral-600'
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
