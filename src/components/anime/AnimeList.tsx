'use client';
import { AnimeDataType, SingleAnimeType } from '@/types/anime';
import Link from 'next/link';
import { useEffect } from 'react';
import { AnimeWithLoading } from './AnimeWithLoading';
import { AnimeLabelProvider, useAnimeLabelContext } from '@/context/animeLabelContext';

type HeaderMenuType =
    | { type: 'link'; link: string }
    | { type: 'custom'; custom: React.ReactNode };

type AnimeListType = {
    title: string;
    animes: AnimeDataType | undefined;
    loading?: boolean;
    headerMenu?: HeaderMenuType;
    label?: keyof SingleAnimeType;
};

function AnimeList({ ...props }: AnimeListType) {
    return (
        <AnimeLabelProvider>
            <Main {...props} />
        </AnimeLabelProvider>
    );
}

function Main({ title, headerMenu, animes, label, loading }: AnimeListType) {
    const { setAnimeLabel } = useAnimeLabelContext();

    useEffect(() => {
        if (!label) return;
        setAnimeLabel(label);
    }, [label, setAnimeLabel]);

    return (
        <section>
            <div className='flex items-center justify-between mb-4'>
                <HeaderTitle title={title} />

                {headerMenu &&
                    (headerMenu.type === 'link' ? (
                        <HeaderLink link={headerMenu.link} />
                    ) : (
                        headerMenu.custom
                    ))}
            </div>
            <main className='relative grid grid-cols-3 md:grid-cols-5 gap-4'>
                <AnimeWithLoading animes={animes} loading={loading} />
            </main>
        </section>
    );
}

function HeaderTitle({ title }: { title: string }) {
    return <h1 className='font-medium text-xl'>{title}</h1>;
}

function HeaderLink({ link }: { link: string }) {
    return (
        <Link
            href={link}
            className='text-sm underline hover:opacity-75 active:opacity-50 transition-opacity text-amber-200'>
            See all
        </Link>
    );
}

export { HeaderTitle, HeaderLink, AnimeList };
