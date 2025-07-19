import clsx from 'clsx';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import colors from '../../../styles/colors';
import { useState } from 'react';

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
  value?: { value: string; label: string } | null;
  loading?: boolean;
  label?: string;
}

export default function CustomSelect({
  options = [],
  onChange,
  variant = 'solid',
  placeholder = 'Seleccione una opcion',
  value,
  loading,
  label,
}: CustomSelectProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const showFloating = focused || !!value;

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
    <div className="relative w-full">
      {label && (
        <label
          className={clsx(
            ' text-sm transition-all z-10',
            showFloating ? 'text-xs -top-1 text-gray-600 dark:text-gray-300' : 'text-gray-400'
          )}
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        onChange={handleChange}
        menuPlacement="top"
        menuPortalTarget={document.body}
        unstyled
        placeholder={placeholder}
        value={value}
        className={clsx(baseStyles, variants[variant])}
        isLoading={loading}
        isSearchable
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        isDisabled={loading}
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
    </div>
  );
}
