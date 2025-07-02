import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories.hook';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import colors from '../../../styles/colors';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import CategoryCard from '../components/categoryCard.component';
import { Button } from '../../../components/animated/button/Button.component';

const CategoriesPage = (): React.JSX.Element => {
  const {
    fetchAll: { data },
    categoriasPopulares,
  } = useCategories();
  const navigate = useNavigate();

  return (
    <div>
      <SectionHeader
        title="Categorias"
        bgColor={colors.coral}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/categories/create')} />}
      />
      <div className="p-4 space-y-4">
        <h2 className="text-3xl font-bold">Las más populares</h2>
        <div className="flex flex-wrap gap-2 ">
          {categoriasPopulares?.map((category) => (
            <Button
              className="w-min truncate"
              style={{ backgroundColor: category.color }}
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              {category.icon + ' ' + category.name} ({category?.transactions.length})
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-3xl font-bold">Todas las categorías</h2>
        {data?.data.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
