import React from 'react';
import ResponsiveCard from '../ResponsiveCard/ResponsiveCard.component';
import { Label, Text } from '../Typography/Typography.component';
import { Button } from '../../animated/button/Button.component';
import { ArrowRight } from 'iconoir-react';
import ItemList from '../ItemList/ItemList.component';
import { cn } from '../../../libs/utils';

interface Token {
  symbol: string;
  amount: string;
  icon?: React.ReactNode;
}

interface TokensCardProps {
  tokens: Token[];
  totalTokens: number;
  className?: string;
}

const TokensCard: React.FC<TokensCardProps> = ({ tokens, totalTokens, className }) => {
  return (
    <ResponsiveCard
      backgroundColor="white"
      className={cn(
        'flex flex-col justify-between',
        'col-span-1 sm:col-span-2 md:col-span-2',
        'row-span-1',
        className
      )}
    >
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between w-full">
          <Label className="text-lg md:text-xl text-brand-black font-sora">
            Tus tokens ({totalTokens})
          </Label>
          <Button className="text-sm hidden md:block" iconRight={<ArrowRight />}>
            Ver todos
          </Button>
        </div>

        <div className="space-y-2 md:space-y-3">
          {tokens.slice(0, 3).map((token, index) => (
            <ItemList
              key={index}
              title={token.symbol}
              value={token.amount}
              icon={token.icon}
              className="!bg-transparent !border-0 !px-0 !py-1 md:!py-2"
            />
          ))}
        </div>

        {/* Botón para mobile */}
        <Button className="text-sm md:hidden w-full" iconRight={<ArrowRight />} variant="terciary">
          Ver todos los tokens
        </Button>
      </div>
    </ResponsiveCard>
  );
};

export default TokensCard;
