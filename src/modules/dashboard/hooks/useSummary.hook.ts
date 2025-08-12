import { getSummary } from '../api/Summary.api';

export const useSummary = () => {
  const query = getSummary();

  return query;
};
