import { useParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories.hook';
import { useEffect } from 'react';

const CategoryDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { search } = useCategories();

  async function fetchCategory() {
    await search.call(Number(id));
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  if (search.loading) return <span>Loading</span>;

  return (
    <div>
      <span>CategoryDetail</span>
      <h2>{search.data?.data.icon + ' ' + search.data?.data.name}</h2>
      <pre>{JSON.stringify(search.data?.data, null, 2)}</pre>
    </div>
  );
};

export default CategoryDetailPage;
