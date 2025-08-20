import Link from 'next/link';
import Button from '../button';
import { SingleAnimeType } from '@/types/anime';
import { useAnimeLabelContext } from '@/context/animeLabelContext';
import Image from 'next/image';

export function Anime({ anime }: { anime: SingleAnimeType }) {
    const { animeLabel } = useAnimeLabelContext();

    return (
        <Link href={`/${anime.mal_id}`}>
            <Button
                variants={{ variant: 'none', withBase: false, size: 'none' }}
                className='rounded-xl flex flex-col gap-2 text-left w-full'>
                <div className='relative aspect-3/4 shrink-0 -z-5 rounded-xl overflow-hidden'>
                    <Image
                        width={300}
                        height={400}
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        className='object-cover w-full h-full'
                    />
                    <div className='p-2 pt-4 bg-linear-0 from-neutral-800 to-transparent text-xs bottom-0 inset-x-0 absolute font-semibold'>
                        <p className='px-2 border-l-2 border-white line-clamp-2'>
                            {anime.rating}
                        </p>
                    </div>

                    {anime[animeLabel] != null && (
                        <span className='absolute top-0 right-0 z-5 font-semibold p-2 rounded-bl-xl bg-neutral-800 flex items-center gap-2 text-sm'>
                            {String(anime[animeLabel])}
                            {animeLabel === 'score' && <span>⭐</span>}
                        </span>
                    )}
                </div>
                <p className='font-medium text-sm line-clamp-2 text-neutral-200'>
                    {anime.title}
                </p>
            </Button>
        </Link>
    );
}
