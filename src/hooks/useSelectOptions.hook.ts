import { GroupBase, OptionsOrGroups } from 'react-select';

export type SelectOption = OptionsOrGroups<
  { value: string; label: string },
  GroupBase<{ value: string; label: string }>
>;

/**
 * Hook para mapear cualquier array a opciones de react-select
 */
export function useSelectOptions<T>() {
  function mapToSelectOptions(
    data: T[],
    mapper: (item: T) => { value: string; label: string },
    manualFirstOption?: { value: string; label: string }
  ): SelectOption {
    const mapped = data.map(mapper);
    return manualFirstOption ? [manualFirstOption, ...mapped] : mapped;
  }

  return {
    mapToSelectOptions,
  };
}
