'use client';
import { CollectionEditProvider } from '@/context/CollectionEditContext';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CollectionEditProvider>{children}</CollectionEditProvider>
        </SessionProvider>
    );
}
