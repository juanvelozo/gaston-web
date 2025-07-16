import { motion } from 'framer-motion';
import { cn } from '../../../libs/utils';
import SkeletonComponent from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  baseColor?: string;
  highlightColor?: string;
  className?: string;
  circle?: boolean;
}

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius = '0.5rem',
  baseColor = '#e0e0e0',
  highlightColor = '#ffffff',
  className,
  circle,
}: SkeletonProps) => {
  return (
    <SkeletonComponent
      width={width}
      enableAnimation
      duration={1.5}
      height={height}
      borderRadius={borderRadius}
      baseColor={baseColor}
      highlightColor={highlightColor}
      className={cn(className)}
      circle={circle}
    />
  );
};
