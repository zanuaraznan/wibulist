'use client';

import { useCollectionEditContext } from '@/context/CollectionEditContext';

export default function UserCommentTitle() {
    const { isEditMode, selected } = useCollectionEditContext();
    return (
        <h1 className='text-xl font-semibold'>
            {isEditMode ? `Selected comments (${selected.length})` : 'My comments'}
        </h1>
    );
}
