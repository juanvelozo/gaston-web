import { useNavigate, useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions.hook';
import { useEffect } from 'react';
import { formatearMonto } from '../../../types/formatearMonto';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowLeft, Clock, DollarCircle, EditPencil, List, Trash, User } from 'iconoir-react';
import OdometerText from '../../../components/animated/odometer/Odometer.component';
import { Button } from '../../../components/animated/button/Button.component';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { ITransactionCardValues } from '../components/transactionCard/transactionCard.component';
import moment from 'moment';
import colors from '../../../styles/colors';

const TransactionDetailPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { search } = useTransactions();
  const navigate = useNavigate();

  async function fetchTransaction() {
    await search.call(Number(id));
  }

  useEffect(() => {
    fetchTransaction();
  }, []);

  if (search.loading) return <span>Loading</span>;
  return (
    <div>
      <SectionHeader
        title="Detalle"
        bgColor={colors.green}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        right={
          <IconButton icon={<EditPencil />} onClick={() => navigate(`/transactions/${id}/edit`)} />
        }
        bottom={<OdometerText text={formatearMonto(search.data?.data.amount!)} />}
      />
      <div className="p-4 space-y-4">
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
          value={search.data?.data.category.name}
          valueIcon={search.data?.data?.category?.icon}
          icon={<List />}
          onClick={() => {
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
    </div>
  );
};

export default TransactionDetailPage;
