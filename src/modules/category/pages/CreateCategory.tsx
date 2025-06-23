import { useState } from 'react';
import { ICreateCategoryDto } from '../model/category.controller';
import { useCategories } from '../hooks/useCategories.hook';
import EmojiButtonPicker from '../../../components/common/emojiPicker/EmojiPicker.component';

const CreateCategoryPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateCategoryDto>({
    name: '',
    description: '',
    color: '',
    icon: '😉',
  });

  const { crear } = useCategories();

  return (
    <div>
      <h2>Crear categoría</h2>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          crear(formData);
        }}
      >
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br />
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <br />
        <label>Color:</label>
        <input
          type="color"
          name="color"
          required
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
        />
        <br />
        <label>Icono:</label>
        <EmojiButtonPicker
          onChange={(emoji: string) => setFormData({ ...formData, icon: emoji })}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
