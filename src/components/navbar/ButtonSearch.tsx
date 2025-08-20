import Button from '../button';
import { Search, X } from 'lucide-react';
import { useBreakpoint } from '@/hooks';
import { useModalContext } from '@/context/modalContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalSearch from './ModalSearch';

export function SearchInput() {
    const [search, setSearch] = useState('');
    const { closeModal } = useModalContext();
    const router = useRouter();

    function handleSearch() {
        if (search.trim() === '') return;
        const keyword = encodeURIComponent(search);
        router.push(`/search/${keyword}`);
        closeModal();
    }

    function handleOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    }

    return (
        <div className='max-w-full rounded-full bg-neutral-700 flex items-center relative'>
            <button className='opacity-75 p-3' onClick={handleSearch}>
                <Search size={18} />
            </button>
            <input
                type='search'
                name='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-[25ch] placeholder:text-sm placeholder:font-medium placeholder:truncate'
                placeholder={'Search anime ..'}
                onKeyDown={handleOnEnter}
                autoFocus
            />
            {search.trim() !== '' && (
                <div className='absolute right-1 flex items-center'>
                    <button
                        type='button'
                        onClick={() => setSearch('')}
                        className='text-neutral-400 p-2'>
                        <X size={12} />
                    </button>
                    <span className='opacity-50 text-xs p-2 bg-neutral-800 border border-neutral-600 rounded-full'>
                        Enter
                    </span>
                </div>
            )}
        </div>
    );
}

export default function ButtonSearch() {
    const isMobile = useBreakpoint();
    const { toggleModal } = useModalContext();

    if (isMobile == null) return null;

    return isMobile ? (
        <>
            <Button
                onClick={toggleModal}
                variants={{ variant: 'none', size: 'sm' }}
                className='p-3'>
                <Search size={18} />
            </Button>
            <ModalSearch />
        </>
    ) : (
        <SearchInput />
    );
}
