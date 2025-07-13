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
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import SectionBody from '../../../components/common/sectionBody/sectionBody.component';
import Textarea from '../../../components/common/textArea/textArea.component';
import Section from '../../../components/animated/section/Section.component';
import Formulario from '../../../components/common/formulario/formulario.component';

const CreateTransationPage = (): React.JSX.Element => {
  const [mostrarCalculadora, setMostrarCalculadora] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateTransactionDto>({
    type: 'INCOME',
    amount: 0,
    title: '',
    description: '',
  });

  const { fetchAll: allCategories } = useCategories();
  const { crear, submitting } = useTransactions();
  const navigate = useNavigate();

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    crear(formData);
  }

  return (
    <div className=" bg-brand-white min-h-screen">
      {/* Header */}
      <Section
        title="Nueva transacción"
        bgColor={colors.green}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        bottom={
          <div className="flex flex-col items-center justify-center">
            <span className="text-center text-white text-sm">
              Ingresa el monto de la transacción
            </span>
            <NumericFormat
              value={formData.amount}
              thousandSeparator="."
              decimalSeparator=","
              prefix="$"
              placeholder="$0.00"
              className="w-full py-2 text-4xl text-center font-bold backdrop-blur transition relative appearance-none outline-none bg-transparent  text-white"
              onValueChange={(e) => setFormData({ ...formData, amount: Number(e.floatValue) })}
              onFocus={() => setMostrarCalculadora(true)}
              onBlur={() => setMostrarCalculadora(false)}
            />
          </div>
        }
      >
        {mostrarCalculadora ? (
          <div>calculadora</div>
        ) : (
          <Formulario
            onSubmit={handleSubmit}
            className="space-y-5"
            loading={submitting}
            disabled={submitting || formData.amount === 0 || !formData.type || !formData.title}
          >
            <TransactionTypeSelect onChange={(e) => setFormData({ ...formData, type: e })} />
            <Input
              placeholder="Agrega un título"
              label="Título"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <CustomSelect
              options={listaDeCategorías}
              onChange={(e) => {
                const selected = e.value;
                setFormData((prev) => ({
                  ...prev,
                  categoryId: selected === '' || selected === 'null' ? undefined : Number(selected),
                }));
              }}
              placeholder="Seleccione una categoría"
            />
            <Textarea
              placeholder="Agrega una descripción"
              label="Descripción (Opcional)"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Formulario>
        )}
      </Section>
    </div>
  );
};

export default CreateTransationPage;
