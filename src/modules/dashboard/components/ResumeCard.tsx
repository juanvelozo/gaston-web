import { ReactNode } from 'react';
import { ISummary } from '../model/dashboard.model';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { ArrowDownRight, ArrowUpRight } from 'iconoir-react';
import { formatearMonto } from '../../../types/formatearMonto';
import { cn } from '../../../libs/utils';

const ResumeCard = ({ data, loading }: IResumeCard): React.JSX.Element => {
  // TOOD: componetizar esta card y agregar fondo animado
  return (
    <div className="flex flex-col md:flex-row bg-brand-white border min-w-[320px] min-h-[170px] md:gap-0 gap-4 p-4 rounded-3xl w-full  flex-wrap justify-start items-start">
      {loading ? (
        <span>Cargando</span>
      ) : (
        data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col  items-start gap-4">
            <p
              className={cn(
                'text-white text-sm font-semibold',
                IResumeCardValues[key as keyof ISummary].color
              )}
            >
              {IResumeCardValues[key as keyof ISummary].title}
            </p>
            <div className="flex items-center gap-4">
              {IResumeCardValues[key as keyof ISummary].icon}
              <OdometerText
                text={formatearMonto(value, (key as keyof ISummary) == 'expense')}
                className={cn(
                  'text-xl font-semibold',
                  IResumeCardValues[key as keyof ISummary].color
                )}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

interface IResumeCard {
  data?: ISummary;
  loading?: boolean;
}

export default ResumeCard;

type ResumeCardConfig = {
  [x in keyof ISummary]: {
    title: string;
    icon?: ReactNode;
    color?: string;
  };
};

const IResumeCardValues: ResumeCardConfig = {
  expense: {
    title: 'Gasto',
    icon: <ArrowDownRight color="red" strokeWidth={2.5} />,
    color: 'text-brand-coral',
  },
  income: {
    title: 'Ingreso',
    icon: <ArrowUpRight color="green" strokeWidth={2.5} />,
    color: 'text-brand-green',
  },
  // saving: { title: 'Ahorro', icon: <PiggyBank color="#deb602" /> },
};
