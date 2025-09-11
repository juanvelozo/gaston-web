import { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';
import colors, { Colors } from '../../../styles/colors';
import { cn } from '../../../libs/utils';
import { IOSSpinner } from '../iosSpinner/Spinner.component';

interface SectionProps extends PropsWithChildren {
  bgColor?: keyof Colors;
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  tall?: boolean;
  loading?: boolean;
}

const Section = ({
  bgColor = 'black',
  title,
  left,
  right,
  bottom,
  children,
  tall = false,
  loading,
}: SectionProps): React.JSX.Element => {
  return (
    <div className="w-full p-2 md:p-4 min-h-screen gap-4 flex flex-col transition-colors duration-500 ease-in-out mb-20 lg:mb-0">
      <div
        className="p-6 transition-colors duration-500 ease-in-out rounded-3xl"
        style={{ background: colors[bgColor] }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className={cn('min-w-10', loading && 'pointer-events-none opacity-75')}>{left}</div>
          <div className="flex-1 px-4 text-center">
            <h1 className="text-2xl font-bold text-white truncate text-center">{title}</h1>
          </div>
          <div className={cn('min-w-10', loading && 'pointer-events-none opacity-75')}>{right}</div>
        </div>
        {bottom && (
          <div className="flex justify-center items-center my-6">
            {loading ? <IOSSpinner /> : bottom}
          </div>
        )}
      </div>

      {/* BODY */}
      <div className={clsx('w-full h-full z-30 bg-brand-white rounded-3xl p-6')}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center p-16">
            <IOSSpinner color={bgColor} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Section;
