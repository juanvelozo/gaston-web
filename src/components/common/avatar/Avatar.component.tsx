import React from 'react';
import { ProfileCircle } from 'iconoir-react';
import { cn } from '../../../libs/utils';
import { Skeleton } from '../../animated/skeleton/skeleton.component';
import colors from '../../../styles/colors';
import { color } from 'framer-motion';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  isLoading?: boolean;
  size?: number;
  className?: string;
}

export const Avatar = ({ src, isLoading = false, size = 48, className, ...props }: AvatarProps) => {
  const dimensionStyle = {
    width: size,
    height: size,
  };

  return (
    <div className={cn('rounded-full', className)} style={dimensionStyle} {...props}>
      {isLoading ? (
        <Skeleton width={size} height={size} circle highlightColor={colors.blue + '80'} />
      ) : src ? (
        <img src={src} alt="avatar" className="w-full h-full object-cover rounded-full" />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-gray-500 bg-white rounded-full">
          <ProfileCircle width={size * 0.8} height={size * 0.8} />
        </div>
      )}
    </div>
  );
};
