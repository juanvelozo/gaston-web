import { ReactNode } from 'react';
import { ISummary } from '../model/dashboard.model';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { Dollar } from 'iconoir-react';

const ResumeCard = ({ data }: IResumeCard): React.JSX.Element => {
  return (
    <div className="flex sm:flex-col md:flex-row bg-slate-300 gap-4 p-4 rounded-3xl shadow-md w-full justify-around">
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center gap-8">
            <div>{IResumeCardValues[key as keyof ISummary].icon}</div>
            <p className="font-bold text-2xl">{IResumeCardValues[key as keyof ISummary].title}</p>
            <Dollar />
            <OdometerText text={`//$ ${value}`} />
          </div>
        ))}
    </div>
  );
};

interface IResumeCard {
  data?: ISummary;
}

export default ResumeCard;

type ResumeCardConfig = {
  [x in keyof ISummary]: {
    title: string;
    icon?: ReactNode;
  };
};

const IResumeCardValues: ResumeCardConfig = {
  expense: { title: 'Gastos' },
  income: { title: 'Ingresos' },
  saving: { title: 'Ahorros' },
};
