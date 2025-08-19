'use client';
import { SingleAnimeType } from '@/types/anime';
import { createContext, ReactNode, useContext, useState } from 'react';

type AnimeLabelType = keyof SingleAnimeType;

type AnimeLabelContextType = {
    animeLabel: AnimeLabelType;
    setAnimeLabel: React.Dispatch<React.SetStateAction<AnimeLabelType>>;
};

const AnimeLabelContext = createContext<AnimeLabelContextType | undefined>(undefined);

function AnimeLabelProvider({ children }: { children: ReactNode }) {
    const [animeLabel, setAnimeLabel] = useState<AnimeLabelType>('type');

    return (
        <AnimeLabelContext.Provider value={{ animeLabel, setAnimeLabel }}>
            {children}
        </AnimeLabelContext.Provider>
    );
}

function useAnimeLabelContext() {
    const context = useContext(AnimeLabelContext);
    if (!context) {
        throw new Error('useAnimeLabelContext must be used within an AnimeLabelContext');
    }
    return context;
}

export { AnimeLabelProvider, useAnimeLabelContext };
