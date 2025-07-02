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
        className,
        'flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100  w-full justify-between cursor-pointer'
      )}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-center gap-3">
        {icon}
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {valueIcon}
        <p className="text-lg">{value}</p>
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
