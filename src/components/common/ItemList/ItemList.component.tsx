import { motion, useInView } from 'framer-motion';
import { cn } from '../../../libs/utils';
import { FC, useRef } from 'react';
import { IItemList } from './ItemList.types';

const ItemList: FC<IItemList> = ({
  onClick,
  icon,
  label,
  title,
  value,
  className,
  valueIcon,
  index: key,
  iconBgColor,
  valueColor = '#000',
}): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'flex items-center gap-4 p-0 sm:p-4 rounded-2xl bg-transparent sm:bg-white sm:border border-gray-100  w-full justify-between cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }} // Entrada sutil desde abajo, con escala ligeramente pequeña
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 300, // rigidez alta para rebote rápido
        damping: 25, // amortiguación para que no rebote mucho
        mass: 0.7, // masa ligera para que sea rápido
        delay: 0.1 * (key ? key / 10 : 0),
      }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-start gap-1 sm:gap-3 min-w-0 flex-1">
        <div
          className={`rounded-2xl py-2 pr-1 pl-0 sm:p-3 flex items-center justify-center`}
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <div className=" flex-1 min-w-0 max-w-fit">
          <p className="text-sm sm:text-base md:text-lg font-semibold truncate text-ellipsis font-sora">
            {title}
          </p>
          <p className="text-gray-600 text-xs truncate text-ellipsis font-work-sans">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 min-w-0 max-w-[50%] justify-end">
        {valueIcon}
        <p
          className={`text-sm sm:text-base md:text-lg font-semibold text-ellipsis truncate font-space-mono`}
          style={{ color: valueColor }}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default ItemList;
