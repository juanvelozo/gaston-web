import clsx from 'clsx';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import colors from '../../../styles/colors';

type Variant = 'solid' | 'transparent';

export type SelectOption =
  | OptionsOrGroups<
      {
        value: string;
        label: string;
      },
      GroupBase<{
        value: string;
        label: string;
      }>
    >
  | undefined;

interface CustomSelectProps {
  options?: SelectOption;
  onChange?: (arg: any) => void;
  variant?: Variant;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  onChange,
  variant = 'solid',
  placeholder = 'Seleccione una opcion',
}: CustomSelectProps) {
  const baseStyles =
    'w-full px-3 rounded-xl backdrop-blur transition relative appearance-none outline-none placeholder:text-gray-400';
  const variants = {
    solid:
      'bg-slate-100 hover:bg-slate-200 border-b focus:bg-slate-200 border-slate-200 text-black',
    transparent: 'bg-white/10 text-black border-white/20',
  };
  const handleChange = (opt: any) => {
    onChange && onChange(opt);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      menuPlacement="top"
      menuPortalTarget={document.body}
      unstyled
      placeholder={placeholder}
      className={clsx(baseStyles, variants[variant])}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (base) => ({
          ...base,
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }),
        option: (base) => ({
          ...base,
          padding: '12px',
          ':hover': { backgroundColor: colors.green, color: colors.white },
        }),
        placeholder: (base) => ({ ...base, color: 'gray', fontSize: '16px' }),
      }}
    />
  );
}
