const Card = ({ title, body, footer }: ICard): React.JSX.Element => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {body}

        {footer}
      </div>
    </div>
  );
};
interface ICard {
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export default Card;
