import { useNavigate } from 'react-router-dom';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { ICategory } from '../model/category.model';
import { NavArrowRight } from 'iconoir-react';
const CategoryCard = ({ data }: ICategoryCard): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <ItemList
      onClick={() => navigate(`/categories/${data.id}`)}
      icon={data?.icon}
      title={data?.name}
      label={
        data?.transactions?.length > 1
          ? `${data?.transactions?.length} transacciones`
          : data?.transactions?.length
            ? `${data?.transactions?.length} transacción`
            : 'No hay transacciones en esta categoría'
      }
      valueIcon={<NavArrowRight />}
    />
  );
};
interface ICategoryCard {
  data: ICategory;
}
export default CategoryCard;
