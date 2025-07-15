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
    <div
      className="min-h-screen w-screen flex flex-col transition-colors duration-500 ease-in-out"
      style={{ background: bgColor }}
    >
      {/* HEADER sticky */}
      <div
        className="sticky top-0 z-20 px-6 pt-6 pb-4 transition-colors duration-500 ease-in-out "
        style={{ background: bgColor }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="min-w-10">{left}</div>
          <div className="flex-1 px-4 text-center">
            <h1 className="text-2xl font-bold text-white truncate text-center">{title}</h1>
          </div>
          <div className="min-w-10">{right}</div>
        </div>
        {bottom && <div className="flex justify-center items-center my-6">{bottom}</div>}
      </div>

      {/* BODY */}
      <div
        className={clsx(
          'w-full z-30 bg-white rounded-t-3xl px-6 pt-6 pb-32',
          tall ? 'flex-grow' : 'h-[75%]',
          'min-h-screen '
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;
