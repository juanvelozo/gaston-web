const SectionHeader = ({
  bgColor,
  left,
  right,
  title,
  bottom,
}: ISectionHeader): React.JSX.Element => {
  return (
    <div
      style={{ background: bgColor }}
      className="h-screen w-screen top-0 left-0 right-0 z-0 absolute px-10 py-4"
    >
      <div>
        <div className="flex justify-between items-center my-8">
          <div>{left}</div>
          <div className="flex gap-2 items-center overflow-hidden place-self-center">
            <h1 className="text-3xl font-bold text-white text-center truncate text-ellipsis px-10">
              {title}
            </h1>
          </div>
          <div>{right}</div>
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
