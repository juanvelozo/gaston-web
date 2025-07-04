import Select, { GroupBase, OptionsOrGroups } from 'react-select';

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

export default function CustomSelect({
  options,
  onChange,
}: {
  options?: SelectOption;
  onChange?: (arg: any) => void;
}) {
  const handleChange = (opt: any) => {
    console.log('Seleccionado:', opt);
    onChange && onChange(opt);
  };
  console.log({ options });

  return (
    <Select
      options={options}
      onChange={handleChange}
      menuPlacement="top"
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
}
