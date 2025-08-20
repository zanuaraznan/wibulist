import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href='/' className='flex items-center gap-2'>
            <Image
                src='/logo.png'
                width={200}
                height={200}
                alt='Wibu List'
                priority
                className='size-10'
            />
            <h1 className='font-semibold text-lg'>
                <span className='text-amber-200'>Wibu</span>List
            </h1>
        </Link>
    );
}
