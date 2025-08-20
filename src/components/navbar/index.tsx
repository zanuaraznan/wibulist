'use client';
import UserButton from './UserButton';
import { ModalProvider } from '@/context/modalContext';
import ButtonSearch from './ButtonSearch';
import Logo from '../Logo';

export default function Navbar() {
    return (
        <header className='sticky z-999 w-full top-0 p-3 px-4 flex justify-between items-center bg-neutral-800 mb-4'>
            <Logo />
            <div className='flex items-center gap-2'>
                <ModalProvider>
                    <ButtonSearch />
                </ModalProvider>
                <UserButton />
            </div>
        </header>
    );
}
