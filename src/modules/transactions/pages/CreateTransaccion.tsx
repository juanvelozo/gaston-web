import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions.hook';
import { ICreateTransactionDto } from '../model/transaction.controller';
import { useCategories } from '../../category/hooks/useCategories.hook';
import { ArrowLeft } from 'iconoir-react';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import colors from '../../../styles/colors';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import Input from '../../../components/common/input/input.component';
import AsyncButton from '../../../components/common/asyncButton/asyncButton.component';
import TransactionTypeSelect from '../components/form/TransactionTypeSelect.component';
import CustomSelect from '../../../components/common/select/select.component';
import { formatearMonto } from '../../../types/formatearMonto';
import { NumericFormat } from 'react-number-format';

const CreateTransationPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateTransactionDto>({
    type: 'INCOME',
    amount: 0,
    title: '',
    description: '',
  });

  const { fetchAll: allCategories } = useCategories();
  const { crear, submitting } = useTransactions();

  const listaDeCategorías: {
    label: string;
    value: string;
  }[] = [
    { label: 'Sin categoría', value: 'null' },
    ...(allCategories?.data?.data?.map((cat) => ({
      label: `${cat.icon} ${cat.name}`,
      value: cat.id.toString(),
    })) ?? []),
  ];

  console.log(formatearMonto(formData.amount));

  return (
    <div className=" bg-brand-white min-h-screen">
      {/* Header */}
      <SectionHeader
        title="Nueva transacción"
        bgColor={colors.green}
        left={<IconButton icon={<ArrowLeft />} onClick={() => {}} />}
      />

      {/* Form */}
      <form className="px-6 py-6 space-y-6">
        <NumericFormat
          value={formData.amount}
          thousandSeparator="."
          decimalSeparator=","
          prefix="$"
          placeholder="$0.00"
          className="w-full py-2 text-4xl text-center font-bold backdrop-blur transition relative appearance-none outline-none  text-black"
          onValueChange={(e) => setFormData({ ...formData, amount: Number(e.floatValue) })}
        />
        <TransactionTypeSelect onChange={(e) => setFormData({ ...formData, type: e })} />
        <Input
          placeholder="Agrega un título"
          label="Título"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Input
          placeholder="Agrega una descripción"
          label="Descripción (Opcional)"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {/* Category */}
        <CustomSelect
          options={listaDeCategorías}
          onChange={(e) => {
            const selected = e.value;
            setFormData((prev) => ({
              ...prev,
              categoryId: selected === '' || selected === 'null' ? undefined : Number(selected),
            }));
          }}
        />
        {/* Submit Button */}
        <AsyncButton
          onClick={() => crear(formData)}
          disabled={submitting || !formData.title || !formData.amount}
          text="Crear transacción"
        />
      </form>
    </div>
  );
};

export default CreateTransationPage;
