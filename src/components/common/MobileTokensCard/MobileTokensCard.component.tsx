import React from 'react';
import ResponsiveCard from '../ResponsiveCard/ResponsiveCard.component';
import { Label } from '../Typography/Typography.component';
import { Button } from '../../animated/button/Button.component';
import { ArrowRight } from 'iconoir-react';
import ItemList from '../ItemList/ItemList.component';
import { cn } from '../../../libs/utils';

interface Token {
    symbol: string;
    amount: string;
    icon?: React.ReactNode;
}

interface MobileTokensCardProps {
    tokens: Token[];
    totalTokens: number;
    className?: string;
}

const MobileTokensCard: React.FC<MobileTokensCardProps> = ({
    tokens,
    totalTokens,
    className,
}) => {
    return (
        <ResponsiveCard
            backgroundColor="white"
            className={cn(
                'flex flex-col justify-between',
                'col-span-1 sm:col-span-2',
                'row-span-1',
                'md:hidden', // Solo visible en mobile
                className
            )}
        >
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between w-full">
                    <Label className="text-lg text-brand-black font-sora">
                        Tus tokens ({totalTokens})
                    </Label>
                    <Button className="text-sm" iconRight={<ArrowRight />} variant="terciary">
                        Ver todos
                    </Button>
                </div>

                <div className="space-y-2">
                    {tokens.slice(0, 2).map((token, index) => (
                        <ItemList
                            key={index}
                            title={token.symbol}
                            value={token.amount}
                            icon={token.icon}
                            className="!bg-transparent !border-0 !px-0 !py-1"
                        />
                    ))}
                </div>
            </div>
        </ResponsiveCard>
    );
};

export default MobileTokensCard;
