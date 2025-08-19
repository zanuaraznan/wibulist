import { AnimeType, SingleAnimeType } from '@/types/anime';

async function getAnime(path: string) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_ANIMELIST_API}/${path}`);
    const result = (await data.json()) as { data: SingleAnimeType };
    return result;
}

async function getAnimes(path: string) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_ANIMELIST_API}/${path}`);
    const result = (await data.json()) as AnimeType;
    return result;
}

let queue: Promise<unknown> = Promise.resolve();

async function queuedFetch(url: string): Promise<AnimeType> {
    queue = queue.then(async () => {
        await new Promise((res) => setTimeout(res, 350));
        return await getAnimes(url);
    });
    return queue as unknown as Promise<AnimeType>;
}

export { getAnime, getAnimes, queuedFetch };
