import { useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { formatearMonto } from '../../../types/formatearMonto';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowLeft, Clock, DollarCircle, EditPencil, List, Trash, User } from 'iconoir-react';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { Button } from '../../../components/animated/button/Button.component';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { ITransactionCardValues } from '../components/transactionCard/transactionCard.component';
import moment from 'moment';
import Section from '../../../components/animated/section/Section.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';
import { ITransaction, TransactionType } from '../model/transactions.model';

const TransactionDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { error, cargando } = useTransactions();
  const navigate = useNavigate();

  // async function fetchTransaction() {
  //   await search.call(Number(id));
  // }

  let search: ITransaction = {
    id: 1,
    title: 'Comida en restaurante',
    description: '',
    amount: 10000,
    type: TransactionType.EXPENSE,
    user: { fullName: 'John Doe', profileImage: '' },
    userId: 1,
    category: {
      name: 'Food',
      icon: '',
      color: 'black',
      createdAt: new Date().toString(),
      description: '',
      id: 1,
      transactions: [],
      updatedAt: new Date().toString(),
      userId: 1,
    },
    categoryId: 1,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  };

  // useEffect(() => {
  //   fetchTransaction();
  // }, []);

  return (
    <div className="flex-1 min-h-screen overflow-y-scroll">
      <Section
        title="Detalle"
        bgColor={cargando ? 'black' : search?.type === 'EXPENSE' ? 'coral' : 'green'}
        // loading={search?.loading}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        right={
          <IconButton
            icon={<EditPencil />}
            onClick={() => navigate(`/transactions/${id}/edit`)}
            disabled={Boolean(error)}
          />
        }
        bottom={
          <div className="flex flex-col items-center justify-center">
            <span className="text-center text-white text-sm">Monto de la transacción</span>
            {error ? (
              <span className="text-4xl py-2 text-white">-</span>
            ) : (
              <OdometerText
                className="text-4xl py-2"
                text={
                  true ? '00000' : formatearMonto(search?.amount! ?? 0, search?.type === 'EXPENSE')
                }
              />
            )}
          </div>
        }
      >
        {error ? (
          <ErrorCard title="Ocurrio un error" errors={[]} />
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{search?.title}</h2>
            <p className="text-sm text-gray-600">
              {search?.description?.length ? search?.description : 'No hay descripción'}
            </p>
            <ItemList
              title="Creado por:"
              value={search?.user?.fullName!}
              icon={<User />}
              valueIcon={
                <img
                  alt={'avatar'}
                  src={search?.user?.profileImage!}
                  className="w-6 h-6 rounded-full"
                />
              }
            />
            <ItemList
              title="Tipo  de transacción"
              value={ITransactionCardValues[search?.type!]?.title}
              valueIcon={ITransactionCardValues[search?.type!]?.icon}
              icon={<DollarCircle />}
            />
            <ItemList
              title="Categoría"
              value={search?.category?.name ?? 'Sin categoría'}
              valueIcon={search?.category?.icon ?? undefined}
              icon={<List />}
              onClick={() => {
                if (!search?.category) return;
                navigate(`/categories/${search?.category.id}`);
              }}
            />
            <ItemList
              title="Creado"
              value={moment(search?.createdAt).format('DD/MM/YYYY [a las] HH:mm')}
              icon={<Clock />}
            />
            <Button
              variant="secondary"
              iconLeft={<Trash color="red" />}
              className="border-red-600 rounded-xl text-red-600 w-full"
            >
              Eliminar transacción
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
};

export default TransactionDetailPage;
