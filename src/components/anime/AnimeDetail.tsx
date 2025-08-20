import { SingleAnimeType } from '@/types/anime';
import Button from '../button';
import { cn, getMergedGenres } from '@/utils';
import VideoPlayer from '../VideoPlayer';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ButtonCollection } from './ButtonCollection';
import Image from 'next/image';

export function AnimeDetail({
    anime,
    children,
}: {
    anime: SingleAnimeType;
    children?: React.ReactNode;
}) {
    return (
        <section className='space-y-6 mb-12'>
            <div
                style={{
                    backgroundImage: `linear-gradient(#1c1c1c99, var(--color-neutral-900)), url(${anime.images.webp.large_image_url})`,
                }}
                className='m-0 absolute w-full top-0 left-0 -z-10 aspect-square max-h-[500px] bg-cover'
            />
            {anime.trailer.youtube_id && (
                <VideoPlayer youtubeId={anime.trailer.youtube_id} />
            )}
            <DetailContent anime={anime} />
            <DetailStatistic anime={anime} className='md:hidden' />
            <DetailSynopsis anime={anime} />
            {children}
        </section>
    );
}

export type CollectionType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    animeId: string;
} | null;

async function DetailContent({ anime }: { anime: SingleAnimeType }) {
    const genres = getMergedGenres(anime);
    const session = await auth();
    let collection: CollectionType = null;

    if (session?.user?.id) {
        collection = await prisma.collection.findUnique({
            where: {
                animeId_userId: {
                    userId: session?.user?.id,
                    animeId: String(anime.mal_id),
                },
            },
        });
    }

    return (
        <div className='flex gap-6'>
            <div className='relative max-h-[400px] aspect-3/4 shrink-0 -z-5 rounded-xl overflow-hidden flex-1'>
                <Image
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    width={300}
                    height={400}
                    className='object-cover w-full h-full'
                />
                <div className='p-2 pt-4 bg-linear-0 from-neutral-800 to-transparent text-xs bottom-0 inset-x-0 absolute font-semibold'>
                    <p className='px-2 border-l-2 border-white line-clamp-2'>
                        {anime.rating}
                    </p>
                </div>
                {anime.type && (
                    <span className='absolute top-0 right-0 z-5 font-semibold p-2 rounded-bl-xl bg-neutral-800 flex items-center gap-2 text-sm'>
                        {anime.type}
                    </span>
                )}
            </div>
            <div className='w-full flex-1 space-y-2'>
                <p className='text-sm p-1 px-3 rounded-lg border border-neutral-700 w-fit text-amber-200 bg-neutral-800/50 backdrop-blur-md'>
                    {anime.status}
                </p>

                <p className='text-sm flex items-center flex-wrap gap-2 bullet-list'>
                    <span>{anime.episodes ?? '-'} Episode(s)</span>
                    {anime.type.toLowerCase() === 'movie' && (
                        <span>{anime.duration}</span>
                    )}
                    {(anime.season != null || anime.year != null) && (
                        <span className='capitalize'>
                            {anime.season} {anime.year}
                        </span>
                    )}
                </p>
                {session && (
                    <ButtonCollection
                        collection={collection}
                        anime={{
                            id: String(anime.mal_id),
                            image: anime.images.webp.image_url,
                            title: anime.title,
                        }}
                    />
                )}
                <h2 className='text-lg font-semibold my-4 line-clamp-2'>{anime.title}</h2>

                <div className='flex gap-2 flex-wrap'>
                    {genres.map((genre) => (
                        <Button
                            key={genre.mal_id}
                            variants={{ variant: 'outline', size: 'sm' }}>
                            {genre.name}
                        </Button>
                    ))}
                </div>
                <DetailStatistic anime={anime} className='hidden md:flex my-4 h-fit' />
            </div>
        </div>
    );
}

function DetailStatistic({
    className,
    anime,
}: {
    anime: SingleAnimeType;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex flex-wrap w-full items-center py-4 rounded-2xl bg-neutral-800 border border-neutral-700 divide-x divide-neutral-700',
                className
            )}>
            {Object.entries(anime).map(([key, value]) => {
                const includedKeys = ['score', 'rank', 'popularity', 'favorites'];
                if (!includedKeys.includes(key)) return;
                const newValue = value != null ? String(value) : '-';
                return (
                    <div
                        key={key}
                        className='flex-1 text-center items-center flex flex-col'>
                        <p className='font-semibold text-xl p-2 text-neutral-200'>
                            {key === 'score'
                                ? `⭐ ${newValue}`
                                : key === 'favorites'
                                ? Number(newValue).toLocaleString()
                                : `#${newValue}`}
                        </p>
                        <span className='capitalize text-sm text-neutral-300'>{key}</span>
                        {key === 'score' && anime.scored_by && (
                            <span className='text-xs text-neutral-400'>
                                by {anime.scored_by.toLocaleString()}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function DetailSynopsis({ anime }: { anime: SingleAnimeType }) {
    return (
        <div>
            <h2 className='text-xl font-semibold mb-2'>Synopsis</h2>
            <p className='text-neutral-300 text-justify'>{anime.synopsis}</p>
        </div>
    );
}
