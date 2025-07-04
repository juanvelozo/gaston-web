import { motion } from 'framer-motion';
import { cn } from '../../../libs/utils';

const ItemList = ({
  onClick,
  icon,
  label,
  title,
  value,
  className,
  valueIcon,
}: IItemList): React.JSX.Element => {
  return (
    <motion.div
      className={cn(
        'flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100  w-full justify-between cursor-pointer',
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-start gap-3 min-w-0 flex-1">
        {icon}
        <div className=" flex-1 min-w-0 max-w-fit">
          <p className="text-lg font-semibold truncate text-ellipsis ">{title}</p>
          <p className="text-gray-600 text-sm truncate text-ellipsis">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 min-w-0 max-w-[50%] justify-end">
        {valueIcon}
        <p className="text-lg text-ellipsis truncate">{value}</p>
      </div>
    </motion.div>
  );
};
interface IItemList {
  onClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  label?: string;
  value?: string;
  className?: string;
  valueIcon?: React.ReactNode;
}

export default ItemList;
