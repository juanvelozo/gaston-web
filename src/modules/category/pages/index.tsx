import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories.hook';

const CategoriesPage = (): React.JSX.Element => {
  const {
    fetchAll: { data },
  } = useCategories();
  return (
    <div>
      <h2>Categorías</h2>
      <Link to="/categories/create">Agregar</Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data?.data.map((category) => (
          <Link to={`/categories/${category.id}`} key={category.id}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
              <h4>{category.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
