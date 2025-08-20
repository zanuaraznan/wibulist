'use client';
import YouTube from 'react-youtube';
import Button from './button';
import { Video, X } from 'lucide-react';
import { useState } from 'react';

export default function VideoPlayer({ youtubeId }: { youtubeId: string }) {
    const [isOpen, setOpen] = useState(true);

    const option = {
        width: '280',
        height: '180',
    };

    function Player() {
        return (
            <>
                <Button
                    onClick={() => setOpen(false)}
                    variants={{ variant: 'secondary' }}
                    className='absolute -top-2 -right-2 p-2'>
                    <X size={18} />
                </Button>
                <YouTube
                    videoId={youtubeId}
                    onReady={(e) => e.target.pauseVideo()}
                    opts={option}
                />
            </>
        );
    }

    function ButtonShow() {
        return (
            <Button
                onClick={() => setOpen(true)}
                variants={{ variant: 'secondary', size: 'sm' }}>
                <Video size={18} />
                Show trailer
            </Button>
        );
    }

    return (
        <div className='fixed bottom-4 right-4 z-999 m-0'>
            {isOpen ? <Player /> : <ButtonShow />}
        </div>
    );
}
