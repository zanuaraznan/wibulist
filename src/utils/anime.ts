import { SingleAnimeType } from '@/types/anime';

export function getMergedGenres(anime: SingleAnimeType) {
    const genres = [...anime.genres, ...anime.explicit_genres, ...anime.themes].sort(
        (a, b) => a.name.length - b.name.length
    );
    return genres;
}
