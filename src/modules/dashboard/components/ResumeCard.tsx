import { ReactNode } from 'react';
import { ISummary } from '../model/dashboard.model';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { ArrowDownRightCircle, ArrowUpRightCircle, PiggyBank } from 'iconoir-react';
import { formatearMonto } from '../../../types/formatearMonto';

const ResumeCard = ({ data }: IResumeCard): React.JSX.Element => {
  // TOOD: componetizar esta card y agregar fondo animado
  return (
    <div className="flex sm:flex-col md:flex-row bg-brand-green md:gap-0 gap-4 p-4 rounded-3xl w-full md:justify-around flex-wrap justify-start items-start md:items-center">
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col items-start gap-4">
            <p className="text-white text-sm">{IResumeCardValues[key as keyof ISummary].title}</p>
            <OdometerText text={formatearMonto(value)} />
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
  expense: { title: 'Gasto', icon: <ArrowDownRightCircle color="red" /> },
  income: { title: 'Ingreso', icon: <ArrowUpRightCircle color="green" /> },
  saving: { title: 'Ahorro', icon: <PiggyBank color="#deb602" /> },
};
