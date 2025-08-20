import { AnimatePresence, motion } from 'motion/react';
import { AnimeDataType } from '@/types/anime';
import { Anime } from './Anime';
import { ComponentProps } from 'react';

export const motionConfig: ComponentProps<typeof motion.div> = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.7 },
    transition: { duration: 0.1, ease: 'easeOut' },
};

export const { initial, ...motionConfigWithoutInitial } = motionConfig;

export function AnimeWithLoading({
    animes,
    loading,
    count,
}: {
    loading?: boolean;
    animes?: AnimeDataType;
    count?: number;
}) {
    return (
        <AnimatePresence mode='popLayout'>
            {!loading && animes && animes.length > 0
                ? animes.map((anime) => (
                      <motion.div key={anime.mal_id} {...motionConfig}>
                          <Anime anime={anime} />
                      </motion.div>
                  ))
                : Array.from({ length: count ?? 9 }).map((_, id) => (
                      <motion.div
                          key={id}
                          className='w-full aspect-3/5 rounded-2xl'
                          {...motionConfigWithoutInitial}>
                          <div className='skeleton-loading' />
                      </motion.div>
                  ))}
        </AnimatePresence>
    );
}
