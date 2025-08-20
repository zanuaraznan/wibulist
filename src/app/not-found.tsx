import Button from '@/components/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function notFound() {
    return (
        <>
            <div className='w-full h-[80dvh] flex flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl font-bold'>404</h1>
                <p>Halaman tidak ditemukan</p>
                <Link href='/'>
                    <Button variants={{ variant: 'outline' }}>
                        <Home size={18} />
                        Kembali ke beranda
                    </Button>
                </Link>
            </div>
        </>
    );
}
