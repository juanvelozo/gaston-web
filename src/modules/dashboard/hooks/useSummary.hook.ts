import { useEndpoint } from '../../../hooks/useEndpoint';
import { getSummary } from '../api/Summary.api';

export const useSummary = () => {
  const query = useEndpoint({ endpoint: getSummary, immediate: true });

  return query;
};
