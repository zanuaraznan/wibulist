import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/button';
import { auth, signOut } from '@/lib/auth';
import { Bookmark, LogOut, MessageSquare } from 'lucide-react';

export default async function Page() {
    const session = await auth();

    function NotSignedInUser() {
        return (
            <>
                <p className='text-center'>You&apos;re not signed in yet</p>
                <Link href='/signin'>
                    <Button>Sign in</Button>
                </Link>
            </>
        );
    }

    function SignedInUser() {
        return (
            <>
                <Image
                    src={session?.user?.image ?? '/logo.png'}
                    width={100}
                    height={100}
                    alt={session?.user?.name ?? 'User'}
                    className='rounded-full'
                />
                <div className='space-y-1 w-full *:w-full'>
                    <Button
                        variants={{ variant: 'none', size: 'none' }}
                        className=' p-5 px-6 rounded-4xl rounded-b-md bg-neutral-800 font-medium'>
                        <span className='text-neutral-400 text-sm'>Username :</span>
                        <span className='ml-auto'>{session?.user?.name}</span>
                    </Button>
                    <Button
                        variants={{ variant: 'none', size: 'none' }}
                        className='p-5 px-6 rounded-md bg-neutral-800 font-medium'>
                        <span className='text-neutral-400 text-sm'>Email :</span>
                        <span className='ml-auto'>{session?.user?.email}</span>
                    </Button>
                    <div className='flex gap-1 w-full *:flex-1'>
                        <Link href='user/collections'>
                            <Button
                                variants={{ variant: 'none', size: 'none' }}
                                className='w-full p-5 px-6 justify-center text-neutral-300 rounded-md rounded-bl-4xl bg-neutral-800 font-medium'>
                                My collections
                                <Bookmark size={18} />
                            </Button>
                        </Link>
                        <Link href='user/comments'>
                            <Button
                                variants={{ variant: 'none', size: 'none' }}
                                className='w-full p-5 px-6 justify-center text-neutral-300 rounded-md rounded-br-4xl bg-neutral-800 font-medium'>
                                My Comments
                                <MessageSquare size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
                <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/user' });
                    }}>
                    <Button variants={{ variant: 'danger' }}>
                        <LogOut size={18} />
                        Sign out
                    </Button>
                </form>
            </>
        );
    }

    return (
        <section className='container flex flex-col items-center justify-center gap-4 h-[80dvh]'>
            {session ? <SignedInUser /> : <NotSignedInUser />}
        </section>
    );
}
