export interface IItemList {
  onClick?: () => void;
  icon?: React.ReactNode;
  iconBgColor?: string;
  title?: string;
  label?: string;
  value?: string;
  className?: string;
  valueIcon?: React.ReactNode;
  index?: number;
  valueColor?: string;
}
