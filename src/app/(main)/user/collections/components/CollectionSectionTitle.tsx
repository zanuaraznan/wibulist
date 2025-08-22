'use client';

import { useCollectionEditContext } from '@/context/CollectionEditContext';

export default function CollectionSectionTitle() {
    const { isEditMode, selected } = useCollectionEditContext();
    return (
        <h1 className='text-xl font-semibold'>
            {isEditMode ? `Selected collections (${selected.length})` : 'My collections'}
        </h1>
    );
}
