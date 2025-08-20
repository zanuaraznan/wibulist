import Providers from '@/components/Providers';
import './globals.css';
import type { Metadata } from 'next';
import { Mona_Sans } from 'next/font/google';

const monaSans = Mona_Sans({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'WibuList | Anime Indonesia',
    description: 'Personal anime list website',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${monaSans.className} text-white bg-neutral-900 antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
