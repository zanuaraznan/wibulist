import { getAnime } from '@/utils';
import { AnimeDetail } from '@/components/anime';
import AnimeComments from '@/components/anime/AnimeComments';
import notFound from '@/app/not-found';

type Params = { params: Promise<{ animeId: string }> };

export default async function Page({ params }: Params) {
    const { animeId } = await params;

    const animeResponse = await getAnime(`anime/${animeId}`);

    if (animeResponse.data == null) return notFound();

    return (
        <main className='container'>
            <AnimeDetail anime={animeResponse.data}>
                <AnimeComments anime={animeResponse.data} />
            </AnimeDetail>
        </main>
    );
}
