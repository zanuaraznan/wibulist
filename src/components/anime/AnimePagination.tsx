import Button from '@/components/button';
import { useAnimeWithPagination } from '@/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = ReturnType<typeof useAnimeWithPagination>;

export function AnimePagination({
    animes,
    pagination: { decreasePage, increasePage, page, setPage },
}: PaginationProps) {
    if (!animes) return;
    const { has_next_page, last_visible_page } = animes.pagination;

    function getPageNumbers(current: number, last: number, hasNext: boolean) {
        const pages: number[] = [];

        const BUTTON_PER_PAGE = 5;
        pages.push(current);

        if (current !== 1) pages.unshift(1);

        if (current !== last) pages.push(last);

        let slotsLeft = BUTTON_PER_PAGE - pages.length;

        let next = current + 1;
        while (slotsLeft > 0 && next < last && hasNext) {
            pages.splice(pages.length - 1, 0, next);
            next++;
            slotsLeft--;
        }

        let before = current - 1;
        while (slotsLeft > 0 && before > 1) {
            pages.splice(1, 0, before);
            before--;
            slotsLeft--;
        }

        return pages;
    }

    const pageNumbers = getPageNumbers(page, last_visible_page, has_next_page);

    return (
        <div className='flex gap-1 p-4 justify-center *:first:rounded-r-md *:last:rounded-l-md'>
            <Button
                onClick={() => decreasePage()}
                variants={{ variant: 'secondary' }}
                disabled={page === 1}>
                <ChevronLeft size={18} />
            </Button>
            {pageNumbers.map((p) => (
                <Button
                    key={p}
                    onClick={() => setPage(p)}
                    variants={{ variant: 'secondary' }}
                    className='rounded-md px-4'
                    disabled={p === page}>
                    {p}
                </Button>
            ))}
            <Button
                onClick={() => increasePage()}
                variants={{ variant: 'secondary' }}
                disabled={!animes?.pagination?.has_next_page}>
                <ChevronRight size={18} />
            </Button>
        </div>
    );
}
