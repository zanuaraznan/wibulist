import { AnimeList, AnimeListCarousel, TopAnimeList } from '@/components/anime';
import Footer from '@/components/Footer';
import { getAnimes, randomizer } from '@/utils';

export default async function Page() {
    const seasonsNowAnime = await getAnimes('seasons/now?limit=12&continuing&sfw');
    return (
        <main className='container space-y-8'>
            <TopAnimeList />
            <AnimeListCarousel
                api={{ url: 'seasons/upcoming' }}
                title='Upcoming season'
                link='/seasons/upcoming'
            />
            <AnimeList
                title='Currently airing'
                headerMenu={{ type: 'link', link: '/seasons/now' }}
                animes={randomizer(seasonsNowAnime.data)}
            />
            <AnimeListCarousel
                api={{
                    url: 'anime',
                    queryParams: {
                        type: 'movie',
                    },
                }}
                title='Movies'
                link='/movie'
                label='duration'
            />
            <AnimeListCarousel
                api={{ url: 'top/anime' }}
                title='Most popular'
                link='/top/all'
                limit={{ default: 2, onBreak: 4 }}
                label='score'
            />
            <Footer />
        </main>
    );
}
