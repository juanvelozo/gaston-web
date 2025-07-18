import { useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { useEffect } from 'react';
import { formatearMonto } from '../../../types/formatearMonto';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowLeft, Clock, DollarCircle, EditPencil, List, Trash, User } from 'iconoir-react';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { Button } from '../../../components/animated/button/Button.component';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { ITransactionCardValues } from '../components/transactionCard/transactionCard.component';
import moment from 'moment';
import colors from '../../../styles/colors';
import Section from '../../../components/animated/section/Section.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';

const TransactionDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { search, error } = useTransactions();
  const navigate = useNavigate();

  async function fetchTransaction() {
    await search.call(Number(id));
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <div className="flex-1 h-screen overflow-y-scroll">
      <Section
        title="Detalle"
        bgColor={colors.green}
        loading={search.loading}
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
                  search.loading
                    ? '00000'
                    : formatearMonto(
                        search.data?.data.amount! ?? 0,
                        search.data?.data.type === 'EXPENSE'
                      )
                }
              />
            )}
          </div>
        }
      >
        {error ? (
          <ErrorCard title="Ocurrio un error" errors={error.response?.data.message} />
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{search.data?.data?.title}</h2>
            <p className="text-sm text-gray-600">
              {search.data?.data.description?.length
                ? search.data?.data.description
                : 'No hay descripción'}
            </p>
            <ItemList
              title="Creado por:"
              value={search.data?.data.user.fullName!}
              icon={<User />}
              valueIcon={
                <img
                  alt={'avatar'}
                  src={search.data?.data.user.profileImage!}
                  className="w-6 h-6 rounded-full"
                />
              }
            />
            <ItemList
              title="Tipo  de transacción"
              value={ITransactionCardValues[search.data?.data.type!]?.title}
              valueIcon={ITransactionCardValues[search.data?.data.type!]?.icon}
              icon={<DollarCircle />}
            />
            <ItemList
              title="Categoría"
              value={search.data?.data.category?.name ?? 'Sin categoría'}
              valueIcon={search.data?.data?.category?.icon ?? undefined}
              icon={<List />}
              onClick={() => {
                if (!search.data?.data.category) return;
                navigate(`/categories/${search.data?.data.category.id}`);
              }}
            />
            <ItemList
              title="Creado"
              value={moment(search.data?.data.createdAt).format('DD/MM/YYYY [a las] HH:mm')}
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
