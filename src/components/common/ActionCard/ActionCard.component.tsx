import React from 'react';
import ResponsiveCard from '../ResponsiveCard/ResponsiveCard.component';
import MockChart from '../MockChart/MockChart.component';
import { cn } from '../../../libs/utils';

interface ActionCardProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    backgroundColor: 'coral' | 'green' | 'blue' | 'teal' | 'burntOrange' | 'skyBlue' | 'olive' | 'softPink';
    className?: string;
    onClick?: () => void;
    showChart?: boolean;
    chartType?: 'send' | 'receive';
}

const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    icon,
    backgroundColor,
    className,
    onClick,
    showChart = false,
    chartType = 'send',
}) => {
    const handleClick = () => {
        console.log('ActionCard clicked:', title); // Debug log
        if (onClick) {
            onClick();
        }
    };

    return (
        <ResponsiveCard
            backgroundColor={backgroundColor}
            isMonochrome={true}
            onClick={handleClick}
            className={cn(
                'flex flex-col justify-between items-start cursor-pointer',
                'col-span-1 sm:col-span-1 md:col-span-1',
                'row-span-1',
                showChart ? 'min-h-[160px] md:min-h-[180px]' : 'min-h-[120px] md:min-h-[140px]',
                className
            )}
        >
            <div className="flex flex-col gap-2 md:gap-3 w-full h-full">
                <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                        <h3 className="text-sm md:text-base font-bold text-white font-sora leading-tight">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-xs md:text-sm text-white/80 font-work-sans mt-1 leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex-shrink-0 ml-3">
                        {icon}
                    </div>
                </div>

                {showChart && (
                    <div className="mt-auto">
                        <MockChart type={chartType} />
                    </div>
                )}
            </div>
        </ResponsiveCard>
    );
};

export default ActionCard;
