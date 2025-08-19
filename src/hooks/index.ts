import { AnimeType } from '@/types/anime';
import { debounce, queuedFetch } from '@/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useState, useTransition } from 'react';

function useBreakpoint(width = 768) {
    const [isBreak, setBreak] = useState<boolean | null>(null);

    function onResize() {
        setBreak(window.innerWidth <= width);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedResize = useMemo(() => debounce(onResize), [width]);

    useLayoutEffect(() => {
        onResize();

        window.addEventListener('resize', debouncedResize);
        return () => removeEventListener('resize', debouncedResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedResize]);

    return isBreak;
}

type useAnimeWithPaginationArgs = [basePath: string, baseSearchParams: URLSearchParams];

function useAnimeWithPagination(
    ...[basePath, baseSearchParams]: useAnimeWithPaginationArgs
) {
    const isMobile = useBreakpoint();
    const searchParams = useSearchParams();
    const baseSearchString = baseSearchParams.toString();

    const [page, setPage] = useState(() => {
        return Number(searchParams.get('page')) || 1;
    });
    const [loading, setLoading] = useState(false);
    const [animes, setAnimes] = useState<AnimeType | null>(null);
    const [pending, startTransition] = useTransition();

    function increasePage(count = 1) {
        setPage((prev) => prev + count);
    }

    function decreasePage(count = 1) {
        setPage((prev) => prev - count);
    }

    useEffect(() => {
        const pageFromUrl = Number(searchParams.get('page')) || 1;
        if (pageFromUrl !== page) {
            setPage(pageFromUrl);
        }
    }, [searchParams, page]);

    useEffect(() => {
        const urlFetcherParams = new URLSearchParams({
            ...Object.fromEntries(baseSearchParams),
            page: String(page),
        });

        async function fetchAnime() {
            if (isMobile == null) return;
            try {
                setLoading(true);
                const animeResponse = await queuedFetch(
                    `${basePath}?${urlFetcherParams.toString()}`
                );
                setAnimes(animeResponse);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        startTransition(() => {
            fetchAnime();
        });

        // updateQuery();
    }, [page, isMobile, baseSearchString, baseSearchParams, basePath]);

    const pagination = {
        increasePage,
        decreasePage,
        page,
        setPage,
        pending,
    };

    return { animes, loading, pagination };
}

export { useBreakpoint, useAnimeWithPagination };
