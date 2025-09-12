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
import { useEffect, useMemo, useTransition } from 'react';

const TransactionDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { transactions, loading, error, fetch } = useTransactions();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  // Buscar la transacción por ID
  const transaction = useMemo(() => {
    if (!id || !transactions.length) return null;
    return transactions.find((t) => t.id.toString() === id) || null;
  }, [id, transactions]);

  // Cargar transacciones si no están cargadas
  useEffect(() => {
    if (!transactions.length && !loading) {
      startTransition(() => {
        fetch();
      });
    }
  }, [transactions.length, loading, fetch]);

  // Si no se encuentra la transacción y no está cargando, mostrar error
  const notFound = !loading && !isPending && !transaction && transactions.length > 0;

  return (
    <div className="flex-1 min-h-screen overflow-y-scroll">
      <Section
        title="Detalle"
        bgColor={
          loading || isPending ? 'black' : transaction?.type === 'EXPENSE' ? 'coral' : 'green'
        }
        loading={loading || isPending}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        right={
          <IconButton
            icon={<EditPencil />}
            onClick={() => navigate(`/transactions/${id}/edit`)}
            disabled={Boolean(error) || !transaction}
          />
        }
        bottom={
          <div className="flex flex-col items-center justify-center">
            <span className="text-center text-white text-sm">Monto de la transacción</span>
            {error || notFound ? (
              <span className="text-4xl py-2 text-white">-</span>
            ) : (
              <OdometerText
                className="text-4xl py-2"
                text={
                  !transaction
                    ? '00000'
                    : (() => {
                        const formatted = formatearMonto(
                          Number(transaction.amount),
                          transaction.type === 'EXPENSE'
                        );
                        return formatted;
                      })()
                }
              />
            )}
          </div>
        }
      >
        {error ? (
          <ErrorCard title="Error al cargar la transacción" errors={[error]} />
        ) : notFound ? (
          <ErrorCard
            title="Transacción no encontrada"
            errors={['La transacción solicitada no existe o no tienes permisos para verla.']}
          />
        ) : !transaction ? (
          <div className="flex items-center justify-center py-8">
            <span className="text-gray-500">Cargando transacción...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{transaction.title}</h2>
            <p className="text-sm text-gray-600">
              {transaction.description?.length ? transaction.description : 'No hay descripción'}
            </p>
            <ItemList title="Usuario:" value="Usuario actual" icon={<User />} />
            <ItemList
              title="Tipo de transacción"
              value={ITransactionCardValues[transaction.type]?.title}
              valueIcon={ITransactionCardValues[transaction.type]?.icon}
              icon={<DollarCircle />}
            />
            <ItemList
              title="Categoría"
              value={transaction.category?.name ?? 'Sin categoría'}
              valueIcon={transaction.category?.icon ?? undefined}
              icon={<List />}
              onClick={() => {
                if (!transaction.category) return;
                navigate(`/categories/${transaction.category.id}`);
              }}
            />
            <ItemList
              title="Creado"
              value={moment(Number(transaction.createdAt) / 1_000_000).format(
                'DD/MM/YYYY [a las] HH:mm'
              )}
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
