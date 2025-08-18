import Button from '@/components/button';
import { GithubIcon, GoogleIcon } from '@/components/Icons';
import Logo from '@/components/Logo';
import { signIn } from '@/lib/auth';

export default function Page() {
    return (
        <main className='container flex h-dvh flex-col items-center justify-center gap-8'>
            <div className='text-center'>
                <h1 className='text-2xl font-semibold'>Welcome</h1>
                <p className='text-zinc-300'>Sign in for your account</p>
            </div>
            <div className='space-y-4'>
                <form
                    action={async () => {
                        'use server';
                        await signIn('google', { redirectTo: '/user' });
                    }}>
                    <Button type='submit'>
                        <GoogleIcon />
                        Sign in with Google
                    </Button>
                </form>
                <form
                    action={async () => {
                        'use server';
                        await signIn('github', { redirectTo: '/user' });
                    }}>
                    <Button type='submit' variants={{ variant: 'secondary' }}>
                        <GithubIcon />
                        Sign in with Github
                    </Button>
                </form>
            </div>
            <Logo />
        </main>
    );
}
