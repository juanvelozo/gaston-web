import BalanceCard from '../../../components/common/BalanceCard/BalanceCard.component';
import TokensCard from '../../../components/common/TokensCard/TokensCard.component';
import MobileTokensCard from '../../../components/common/MobileTokensCard/MobileTokensCard.component';

const MainCard = () => {
  const tokens = [
    { symbol: 'BTC', amount: '00.32000' },
    { symbol: 'ICP', amount: '00.32000' },
    { symbol: 'USDT', amount: '00.32000' },
  ];

  return (
    <>
      {/* Balance Card */}
      <BalanceCard
        totalBalance={1000212}
        expenses={10002}
        income={4032}
        className="md:col-span-2 md:row-span-1"
      />

      {/* Tokens Card - Solo visible en desktop */}
      <TokensCard
        tokens={tokens}
        totalTokens={8}
        className="hidden md:block md:col-start-1 md:col-span-2 md:row-start-2 md:row-end-3"
      />

      {/* Mobile Tokens Card - Solo visible en mobile */}
      <MobileTokensCard tokens={tokens} totalTokens={8} className="col-span-1 sm:col-span-2" />
    </>
  );
};

export default MainCard;
