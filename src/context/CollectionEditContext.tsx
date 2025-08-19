'use client';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type CollectionEditContextType = {
    isEditMode: boolean;
    selected: string[];
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const CollectionEditContext = createContext<CollectionEditContextType | undefined>(
    undefined
);

function CollectionEditProvider({ children }: { children: ReactNode }) {
    const [isEditMode, setEditMode] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        if (!isEditMode) setSelected([]);
    }, [isEditMode, setSelected]);

    useEffect(() => {
        setEditMode(false);
        setSelected([]);
    }, [pathname]);

    return (
        <CollectionEditContext.Provider
            value={{ isEditMode, selected, setEditMode, setSelected }}>
            {children}
        </CollectionEditContext.Provider>
    );
}

function useCollectionEditContext() {
    const context = useContext(CollectionEditContext);
    if (!context) {
        throw new Error(
            'useCollectionEditContext must be used within an CollectionEditContext'
        );
    }
    return context;
}

export { CollectionEditProvider, useCollectionEditContext };
