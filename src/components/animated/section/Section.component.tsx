import { PropsWithChildren, ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps extends PropsWithChildren {
  bgColor?: string;
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  tall?: boolean;
}

const Section = ({
  bgColor = '#000',
  title,
  left,
  right,
  bottom,
  children,
  tall = false,
}: SectionProps): React.JSX.Element => {
  return (
    <div className="min-h-screen w-screen flex flex-col" style={{ background: bgColor }}>
      {/* HEADER sticky */}
      <div className="sticky top-0 z-50 px-6 pt-6 pb-4" style={{ background: bgColor }}>
        <div className="flex justify-between items-center mb-4">
          <div>{left}</div>
          <div className="flex-1 px-4 text-center">
            <h1 className="text-2xl font-bold text-white truncate">{title}</h1>
          </div>
          <div>{right}</div>
        </div>
        {bottom && <div className="flex justify-center items-center">{bottom}</div>}
      </div>

      {/* BODY */}
      <div
        className={clsx(
          'w-full bg-white rounded-t-3xl px-6 pt-6 pb-32',
          tall ? 'flex-grow' : 'h-[75%]'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
