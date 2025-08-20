import Link from 'next/link';
import Button from '../button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserButton() {
    const { data: session, status } = useSession();

    const signInButton = (
        <Link href='/signin'>
            <Button>Sign in</Button>
        </Link>
    );

    const userProfile = (
        <Link href='/user'>
            <Image
                width={100}
                height={100}
                src={session?.user?.image ?? '/logo.png'}
                alt={session?.user?.name ?? 'user'}
                className='rounded-full size-10 bg-neutral-700'
            />
        </Link>
    );

    if (status === 'loading') {
        return null;
    }

    return session ? userProfile : signInButton;
}
