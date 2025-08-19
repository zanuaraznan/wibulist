import { memo } from 'react';

type RippleProps = {
    x: number;
    y: number;
    size: number;
    onAnimationEnd: React.DOMAttributes<HTMLDivElement>['onAnimationEnd'];
};

function Main({ x, y, size, onAnimationEnd }: RippleProps) {
    return (
        <div
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
            }}
            onAnimationEnd={onAnimationEnd}
            className='ripple'
        />
    );
}

const Ripple = memo(function RippleEffect({
    ripples,
    onAnimationEnd,
}: {
    ripples: { id: number; x: number; y: number; size: number }[];
    onAnimationEnd: (id: number) => void;
}) {
    return (
        <>
            {ripples.map((ripple) => (
                <Main
                    key={ripple.id}
                    {...ripple}
                    onAnimationEnd={() => onAnimationEnd(ripple.id)}
                />
            ))}
        </>
    );
});

export default Ripple;
