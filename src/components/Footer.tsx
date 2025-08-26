import { GithubIcon, InstagramIcon } from './Icons';

export default function Footer() {
    return (
        <footer className='p-8 container flex items-center justify-between border-t border-neutral-800 mt-8'>
            <h2 className='text-lg font-medium text-neutral-400'>
                Powered by <span className='font-bold'>Jikan API</span>
            </h2>

            <div className='flex items-center gap-4'>
                <a
                    href='https://instagram.com/zanuar.rsy'
                    rel='noopener noreferrer'
                    referrerPolicy='no-referrer'>
                    <InstagramIcon size={24} />
                </a>
                <a
                    href='https://github.com/zanuaraznan'
                    rel='noopener noreferrer'
                    referrerPolicy='no-referrer'>
                    <GithubIcon size={20} />
                </a>
            </div>
        </footer>
    );
}
