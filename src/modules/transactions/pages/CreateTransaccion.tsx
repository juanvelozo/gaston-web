import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTransactions } from '../hooks/useTransactions.hook';
import { ICreateTransactionDto } from '../model/transaction.controller';
import { useCategories } from '../../category/hooks/useCategories.hook';
import { ArrowLeft } from 'iconoir-react';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import Input from '../../../components/common/input/input.component';
import TransactionTypeSelect, {
  ITransactionButtonValues,
} from '../components/form/TransactionTypeSelect.component';
import CustomSelect, { SelectOption } from '../../../components/common/select/select.component';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from '../../../components/common/textArea/textArea.component';
import Section from '../../../components/animated/section/Section.component';
import Formulario from '../../../components/common/formulario/formulario.component';
import ErrorCard from '../../../components/common/ErrorCard/ErrorCard.component';
import { useSelectOptions } from '../../../hooks/useSelectOptions.hook';
import { ICategory } from '../../category/model/category.model';

const CreateTransationPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateTransactionDto>({
    type: 'INCOME',
    amount: 0,
    title: '',
    description: '',
    categoryId: undefined,
  });
  const [bgColor, setBgColor] = useState<string>(ITransactionButtonValues[formData.type].color);

  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { fetchAll: allCategories } = useCategories();
  const { crear, submitting, search, cargando, error, editar } = useTransactions();
  const navigate = useNavigate();
  const { mapToSelectOptions } = useSelectOptions<ICategory>();

  const ocurrioUnError = Boolean(error);
  const estamosEditando = Boolean(id);
  const listaDeCategorías = useMemo(() => {
    return mapToSelectOptions(
      allCategories.data?.data ?? [],
      (cat) => ({
        value: cat.id.toString(),
        label: `${cat.icon} ${cat.name}`,
      }),
      { value: 'null', label: 'Sin categoría' }
    );
  }, [allCategories.data?.data]);

  const categoríaYaAsignada = (listaDeCategorías as { value: string; label: string }[])?.find(
    (cat) => cat.value === formData.categoryId?.toString()
  );

  async function fetchDetail() {
    await search.call(Number(id));
    if (search.data?.data) {
      setFormData({
        amount: search?.data?.data?.amount,
        title: search?.data?.data?.title,
        description: search?.data?.data?.description,
        type: search?.data?.data?.type,
      });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (estamosEditando) {
      editar(Number(id), formData);
    } else {
      crear(formData);
    }
  }

  function enfocarInputMonto() {
    if (inputRef?.current) inputRef?.current?.focus();
  }

  useEffect(() => {
    if (inputRef?.current) inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (estamosEditando) fetchDetail();
  }, [estamosEditando]);

  useEffect(() => {
    if (search.data?.data) {
      setFormData({
        amount: search?.data?.data?.amount,
        title: search?.data?.data?.title,
        description: search?.data?.data?.description,
        type: search?.data?.data?.type,
        categoryId: search?.data?.data?.category?.id,
      });
    }
  }, [search.data?.data]);

  return (
    <div className=" flex-1 h-screen overflow-y-scroll">
      {/* Header */}
      <Section
        // tall
        loading={cargando}
        title={
          estamosEditando ? 'Editar' : formData.type === 'EXPENSE' ? 'Nuevo gasto' : 'Nuevo ingreso'
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
          <ErrorCard errors={error?.response?.data.message} />
        ) : (
          <Formulario
            onSubmit={handleSubmit}
            className="space-y-5"
            loading={submitting}
            disabled={submitting || !formData.type || !formData.title}
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
              loading={allCategories.loading}
              options={listaDeCategorías}
              onChange={(e) => {
                const selected = e.value;
                setFormData((prev) => ({
                  ...prev,
                  categoryId: selected === '' || selected === 'null' ? undefined : Number(selected),
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
