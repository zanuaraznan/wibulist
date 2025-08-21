'use client';
import { cn } from '@/utils';
import Button from '@/components/button';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ModalProvider, useModalContext } from '@/context/modalContext';

type SelectionFilterProps = {
    selected?: string;
    selectionList?: string[];
};

export default function SelectionFilter({
    selectOptions,
}: {
    selectOptions: SelectionFilterProps;
}) {
    return (
        <ModalProvider>
            <div className='relative'>
                <SelectionFilterButton selected={selectOptions.selected} />
                <SelectionFilterModal opt={selectOptions} />
            </div>
        </ModalProvider>
    );
}

function SelectionFilterButton({ selected }: SelectionFilterProps) {
    const { toggleModal, isAnimate } = useModalContext();

    return (
        <Button
            onClick={toggleModal}
            className='capitalize rounded-lg'
            variants={{ variant: 'outline', size: 'sm' }}>
            {selected === 'bypopularity' ? 'By popularity' : selected}
            <ChevronDown
                size={14}
                className={cn(
                    'opacity-75 transition-transform',
                    isAnimate && 'rotate-180'
                )}
            />
        </Button>
    );
}

function SelectionFilterModal({ opt }: { opt: SelectionFilterProps }) {
    const { modalRef, isOpen, closeModal, isAnimate } = useModalContext();
    const router = useRouter();

    if (!opt) return null;

    return (
        isOpen && (
            <div
                ref={modalRef}
                className={cn(
                    'absolute z-999 top-[130%] right-0 bg-neutral-800 ring ring-neutral-700 text-neutral-200 transition-all',
                    !isAnimate && '-translate-y-10 opacity-0'
                )}>
                {opt.selectionList?.map((list, id) => (
                    <Button
                        key={id}
                        className='selection-child text-nowrap'
                        onClick={() => {
                            router.replace(list);
                            closeModal();
                        }}
                        variants={{ variant: 'none', withBase: false }}>
                        {list === 'bypopularity' ? 'By popularity' : list}
                    </Button>
                ))}
            </div>
        )
    );
}
