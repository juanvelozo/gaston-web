import { PropsWithChildren } from 'react';

const SectionBody = ({ children, tall = false }: ISectionBody): React.JSX.Element => {
  return (
    <div className="w-full h-screen self-center inset-0 bottom-0 top-0 right-0 z-10">
      <div
        className={`p-8 absolute w-full left-0 right-0 bottom-0 bg-white rounded-t-3xl ${tall ? 'h-[85%]' : 'h-[75%]'} pb-32 overflow-y-scroll`}
      >
        {children}
      </div>
      ;
    </div>
  );
};
interface ISectionBody extends PropsWithChildren {
  tall?: boolean;
}

export default SectionBody;
