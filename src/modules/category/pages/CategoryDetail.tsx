import { useNavigate, useParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories.hook';
import { useEffect } from 'react';
import { ArrowLeft, EditPencil, Trash } from 'iconoir-react';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import Card from '../../../components/common/Card/Card.component';
import CategoryStats from '../components/categoryStats.component';
import { formatearMonto } from '../../../types/formatearMonto';
import { ITransactionCardValues } from '../../transactions/components/transactionCard/transactionCard.component';
import { Button } from '../../../components/animated/button/Button.component';

const CategoryDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { search } = useCategories();
  const navigate = useNavigate();

  async function fetchCategory() {
    await search.call(Number(id));
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const total = search?.data?.data?.transactions?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div>
      <SectionHeader
        title={search?.data?.data?.name}
        bgColor={search?.data?.data?.color}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        right={
          <IconButton icon={<EditPencil />} onClick={() => navigate(`/transactions/${id}/edit`)} />
        }
        bottom={
          <div className="flex flex-col gap-4 items-center justify-center">
            <IconButton icon={search?.data?.data?.icon} />

            <p className="text-white text-xl font-bold">
              {search?.data?.data?.transactions?.length} transacciones
            </p>
          </div>
        }
      />
      <div className="p-4 space-y-4">
        <Card
          title="Descripción"
          body={
            <p className="text-gray-600 text-sm">
              {search?.data?.data?.description.length
                ? search?.data?.data?.description
                : 'No hay descripción.'}
            </p>
          }
        />
        <Card
          title="Resumen"
          body={
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-lg">Total</p>
              <p className="text-brand-green font-bold text-lg">{formatearMonto(total)}</p>
            </div>
          }
          footer={<CategoryStats data={search?.data?.data} />}
        />
        <Card
          title="Transacciones"
          body={
            search?.data?.data?.transactions.length ? (
              search?.data?.data?.transactions.map((t) => (
                <ItemList
                  onClick={() => navigate(`/transactions/${t.id}`)}
                  key={t.id}
                  index={t.id}
                  icon={ITransactionCardValues[t.type].icon}
                  title={t.title}
                  value={formatearMonto(t.amount)}
                />
              ))
            ) : (
              <p className="text-gray-600 text-sm">
                No hay ningún transacción con esta categoría. Podes crear una y asignarle esta
                categoría para poder visualizarlas en esta sección.
              </p>
            )
          }
          footer={
            !search?.data?.data?.transactions.length ? (
              <Button onClick={() => navigate(`/transactions/create`)} className="w-full">
                Crear una transacción
              </Button>
            ) : null
          }
        />
        <Button
          variant="secondary"
          iconLeft={<Trash color="red" />}
          className="border-red-600 rounded-xl text-red-600 w-full"
        >
          Eliminar categoría (PELIGROSO)
        </Button>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
