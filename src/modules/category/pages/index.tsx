import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories.hook';
import colors from '../../../styles/colors';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { Plus } from 'iconoir-react';
import CategoryCard from '../components/categoryCard.component';
import { Button } from '../../../components/animated/button/Button.component';
import Section from '../../../components/animated/section/Section.component';
import Input from '../../../components/common/input/input.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';

const CategoriesPage = (): React.JSX.Element => {
  const {
    fetchAll: { data, loading, error },
    categoriasPopulares,
  } = useCategories();
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-screen overflow-y-scroll">
      <Section
        title="Categorias"
        bgColor={colors.coral}
        right={<IconButton icon={<Plus />} onClick={() => navigate('/categories/create')} />}
      >
        {error ? (
          <ErrorCard errors={error.response?.data.message} />
        ) : (
          <div className="space-y-6">
            <div className="sticky top-0 z-10 pt-3">
              <Input placeholder="Buscar" disabled={loading} className="p-4" loading={loading} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Las más populares</h2>
              <div className="flex flex-wrap gap-2 ">
                {categoriasPopulares?.length ? (
                  categoriasPopulares?.map((category) => (
                    <Button
                      key={category.id}
                      className="w-min truncate text-ellipsis max-w-52"
                      style={{ backgroundColor: category.color }}
                      onClick={() => navigate(`/categories/${category.id}`)}
                      iconRight={<span>({category?.transactions.length})</span>}
                    >
                      {category.icon + ' ' + category.name}
                    </Button>
                  ))
                ) : (
                  <span className="text-sm text-gray-600">
                    Las categorías que mas se usan aparecerán aquí
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">Todas las categorías</h2>
              {data?.data.map((category) => (
                <CategoryCard key={category.id} data={category} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
};

export default CategoriesPage;
