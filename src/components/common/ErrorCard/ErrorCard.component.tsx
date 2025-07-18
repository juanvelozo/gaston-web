import { WarningTriangle } from 'iconoir-react';

const ErrorCard = ({ errors, title = 'Ocurrio un error' }: IErrorCard): React.JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row bg-brand-coral/10 min-w-[320px] min-h-[170px] md:gap-0 gap-4 p-4 rounded-3xl w-full  flex-wrap justify-start items-center text-center">
      <WarningTriangle className="w-10 h-10 text-brand-coral" />
      <h2 className="text-xl font-bold text-brand-coral">{title}</h2>
      {Array.isArray(errors) ? (
        errors.map((error) => (
          <ul key={error} className="space-y-2">
            <span className="text-sm">{error}</span>
          </ul>
        ))
      ) : (
        <span className="text-sm">{errors?.[0]}</span>
      )}
    </div>
  );
};
interface IErrorCard {
  title?: string;
  errors?: string[];
}

export default ErrorCard;
