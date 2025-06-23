import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions.hook';
import { ICreateTransactionDto } from '../model/transaction.controller';
import { TransactionType } from '../model/transactions.model';

const CreateTransationPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateTransactionDto>({
    type: 'INCOME',
    amount: 0,
    title: '',
    description: '',
    categoryId: 0,
  });

  const { crear } = useTransactions();

  return (
    <div>
      <h2>Crear transacción</h2>
      <br />
      <form
        id="transaction-form"
        onSubmit={(e) => {
          e.preventDefault();
          crear(formData);
        }}
      >
        <label>Tipo:</label>
        <select
          id="type"
          name="type"
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
        >
          <option value="INCOME">Ingreso</option>
          <option value="EXPENSE">Gasto</option>
          <option value="SAVING">Ahorro</option>
        </select>
        <br />

        <label>Monto:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          step="0.01"
          required
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
        />
        <br />

        <label>Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <br />

        <label>Descripción (opcional):</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <br />

        <label>Categoría:</label>
        <input
          type="number"
          id="categoryId"
          name="categoryId"
          required
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value, 10) })}
        />
        <br />

        <button type="submit">Crear Transacción</button>
      </form>
    </div>
  );
};

export default CreateTransationPage;
