import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useTransactions } from '../hooks/useTransactions.hook';
import { CreateTransactionRequest, TransactionType } from '../model/transactions.model';
import { ITransactionButtonValues } from '../components/form/TransactionTypeSelect.component';
import { useCategories } from '../../category/hooks/useCategories.hook';
import { ArrowLeft, FloppyDisk } from 'iconoir-react';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import Input from '../../../components/common/input/input.component';
import TransactionTypeSelect from '../components/form/TransactionTypeSelect.component';
import CustomSelect from '../../../components/common/select/select.component';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from '../../../components/common/textArea/textArea.component';
import Section from '../../../components/animated/section/Section.component';
import Formulario from '../../../components/common/formulario/formulario.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';
import { useSelectOptions } from '../../../hooks/useSelectOptions.hook';
import { ICategory } from '../../category/model/category.model';
import { Colors } from '../../../styles/colors';

const CreateTransationPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState({
    type: TransactionType.EXPENSE,
    amount: 0,
    title: '',
    description: '',
    categoryId: undefined as bigint | undefined,
  });
  const [bgColor, setBgColor] = useState<keyof Colors>(
    ITransactionButtonValues[formData.type].color
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { categories, loading: categoriesLoading, fetch: fetchCategories } = useCategories();
  const { create, submitting, error } = useTransactions();
  const navigate = useNavigate();
  const { mapToSelectOptions } = useSelectOptions<ICategory>();
  const [isPending, startTransition] = useTransition();

  const ocurrioUnError = Boolean(error);
  const estamosEditando = Boolean(id);

  const listaDeCategorías = useMemo(() => {
    return mapToSelectOptions(
      categories,
      (cat) => ({
        value: cat.id.toString(),
        label: `${cat.icon} ${cat.name}`,
      }),
      { value: 'null', label: 'Sin categoría' }
    );
  }, [categories, mapToSelectOptions]);

  const categoríaYaAsignada = (listaDeCategorías as { value: string; label: string }[])?.find(
    (cat) => cat.value === formData.categoryId?.toString()
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    if (formData.amount === 0 || !formData.title.trim()) {
      return;
    }
    e.preventDefault();

    const transactionData: CreateTransactionRequest = {
      categoryId: formData.categoryId || undefined,
      title: formData.title,
      type: formData.type,
      description: formData.description,
      amount: BigInt(formData.amount * 100), // Convertir a centavos
    };

    startTransition(async () => {
      const result = await create(transactionData);
      if (result) {
        navigate('/transactions');
      }
    });
  }

  function enfocarInputMonto() {
    if (inputRef?.current) inputRef?.current?.focus();
  }

  useEffect(() => {
    if (inputRef?.current) inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    startTransition(() => {
      fetchCategories();
    });
  }, [fetchCategories]);

  return (
    <div className=" flex-1 min-h-screen overflow-y-scroll">
      {/* Header */}
      <Section
        loading={submitting || isPending}
        title={
          estamosEditando
            ? 'Editar'
            : formData.type === TransactionType.EXPENSE
              ? 'Nuevo gasto'
              : 'Nuevo ingreso'
        }
        bgColor={bgColor}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        bottom={
          ocurrioUnError ? undefined : (
            <div
              className="flex flex-col items-center justify-center"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="text-center text-white text-sm">
                Ingresa el monto haciendo click en este campo
              </span>
              <NumericFormat
                getInputRef={inputRef}
                value={formData.amount}
                thousandSeparator="."
                decimalSeparator=","
                prefix="$ "
                autoFocus={true}
                inputMode="numeric"
                placeholder="$0.00"
                className="w-full py-2 text-4xl text-center font-bold transition-colors duration-500 ease-in-out appearance-none outline-none bg-transparent  text-white"
                onValueChange={(e) => setFormData({ ...formData, amount: Number(e.floatValue) })}
              />
            </div>
          )
        }
      >
        {ocurrioUnError ? (
          <ErrorCard errors={[error || 'Error desconocido']} />
        ) : (
          <Formulario
            buttonProps={{
              style: {
                backgroundColor: bgColor,
                transition: 'background-color 0.5s ease-in-out',
              },
              iconRight: <FloppyDisk />,
            }}
            onSubmit={handleSubmit}
            className="space-y-5"
            loading={submitting || isPending}
            disabled={
              submitting || isPending || !formData.type || !formData.title || formData.amount === 0
            }
            idleText="Guardar"
          >
            <p>Elegí el tipo de transacción:</p>
            <TransactionTypeSelect
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e });
                setBgColor(ITransactionButtonValues[e].color);
              }}
            />
            <Input
              placeholder="Agrega un título"
              label="Título"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <CustomSelect
              label="Categoría (Opcional)"
              loading={categoriesLoading}
              options={listaDeCategorías}
              onChange={(e) => {
                const selected = e.value;
                setFormData((prev) => ({
                  ...prev,
                  categoryId: selected === '' || selected === 'null' ? undefined : BigInt(selected),
                }));
              }}
              value={categoríaYaAsignada || null}
              placeholder="Seleccione una categoría"
            />

            <Textarea
              placeholder="Agrega una descripción"
              label="Descripción (Opcional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Formulario>
        )}
      </Section>
    </div>
  );
};

export default CreateTransationPage;
