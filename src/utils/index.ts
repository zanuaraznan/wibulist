import clsx from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { NextResponse } from 'next/server';

function apiResponse(body: object, status: number) {
    return NextResponse.json(body, { status });
}

function randomizer<T>(data: T[]): T[] {
    return data.sort(() => Math.random() - 0.5);
}

function debounce<F extends (...args: unknown[]) => void>(fn: F, delay = 300) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function cn(...inputs: ClassNameValue[]) {
    return twMerge(clsx(inputs));
}

function getTimeAgo(date: Date) {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    let text = '';
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (diff < 60) text = diff === 1 ? '1 second ago' : `${diff} seconds ago`;
    else if (minutes < 60)
        text = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    else if (hours < 24) text = hours === 1 ? 'An hour ago' : `${hours} hours ago`;
    else if (days < 7) text = days === 1 ? 'Yesterday' : `${days} days ago`;
    else if (weeks < 4) text = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    else if (months < 12) text = months === 1 ? '1 month ago' : `${months} months ago`;
    else text = years === 1 ? '1 year ago' : `${years} years ago`;
    return text;
}

export { randomizer, debounce, cn, getTimeAgo, apiResponse };
export { getMergedGenres } from './anime';
export { getAnime, getAnimes, queuedFetch } from './fetcher';
