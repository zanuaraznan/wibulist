import notFound from '@/app/not-found';
import TopAnimePagination from './components/TopAnimePagination';
import SelectionFilter from '@/app/(main)/top/[filter]/components/SelectionFilter';

const topAnimeFilter = ['all', 'airing', 'upcoming', 'bypopularity', 'favorite'];

export async function generateStaticParams() {
    return topAnimeFilter.map((filter) => ({ filter }));
}

export default async function Page({ params }: { params: Promise<{ filter: string }> }) {
    const { filter } = await params;
    if (!topAnimeFilter.includes(filter)) notFound();

    return (
        <main className='container'>
            <TopAnimePagination
                filter={filter}
                headerCustom={
                    <SelectionFilter
                        selectOptions={{
                            selected: filter,
                            selectionList: topAnimeFilter,
                        }}
                    />
                }
            />
        </main>
    );
}
