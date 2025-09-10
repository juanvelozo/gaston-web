import React, { useRef, useState } from 'react';
import { cn } from '../../../libs/utils';
import colors, { Colors } from '../../../styles/colors';

interface Position {
    x: number;
    y: number;
}

interface ResponsiveCardProps extends React.PropsWithChildren {
    className?: string;
    backgroundColor?: keyof Colors;
    isMonochrome?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
    children,
    className = '',
    backgroundColor = 'white',
    isMonochrome = false,
    onClick,
    spotlightColor = 'rgba(255, 255, 255, 0.5)',
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState<number>(0);

    const textColor = isMonochrome ? 'text-white' : 'text-brand-black';
    const borderColor = isMonochrome ? 'border-white/20' : 'border-brand-black/20';

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!divRef.current || isFocused) return;

        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(0.6);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(0.6);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ backgroundColor: colors[backgroundColor] }}
            className={cn(
                'relative rounded-2xl md:rounded-[32px] overflow-hidden p-4 md:p-6 lg:p-8',
                'border transition-all duration-300 ease-in-out',
                'hover:shadow-lg hover:scale-[1.02]',
                isMonochrome ? borderColor : borderColor,
                textColor,
                className
            )}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
                }}
            />
            {children}
        </div>
    );
};

export default ResponsiveCard;
