const SectionHeader = ({
  bgColor,
  left,
  right,
  title,
  bottom,
}: ISectionHeader): React.JSX.Element => {
  return (
    <div>
      <div className={`bg-[${bgColor}] p-6 rounded-b-3xl`}>
        <div className="flex gap-2 justify-between items-center my-4">
          {left}
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          {right}
        </div>
        <div className="flex items-center justify-center p-2">{bottom}</div>
      </div>
    </div>
  );
};
interface ISectionHeader {
  bgColor?: string;
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
}

export default SectionHeader;
