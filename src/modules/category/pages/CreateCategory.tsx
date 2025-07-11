import { useState } from 'react';
import { ICreateCategoryDto } from '../model/category.controller';
import { useCategories } from '../hooks/useCategories.hook';
import EmojiButtonPicker from '../../../components/common/emojiPicker/EmojiPicker.component';
import SectionHeader from '../../../components/common/sectionHeader/sectionHeader.component';
import colors from '../../../styles/colors';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowLeft } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import AsyncButton from '../../../components/common/asyncButton/asyncButton.component';
import ColorPicker from '../../../components/common/colorPicker/ColorPicker.component';
import SectionBody from '../../../components/common/sectionBody/sectionBody.component';
import Textarea from '../../../components/common/textArea/textArea.component';

const CreateCategoryPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateCategoryDto>({
    name: '',
    description: '',
    color: '',
    icon: '😉',
  });

  const { crear } = useCategories();
  const navigate = useNavigate();

  return (
    <div>
      <SectionHeader
        title="Nueva categoría"
        bgColor={formData.color ? formData.color : colors.coral}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        bottom={<EmojiButtonPicker onChange={(e) => setFormData({ ...formData, icon: e })} />}
      />
      <SectionBody>
        <form className="space-y-6">
          <Input
            label="Nombre"
            type="text"
            placeholder='Ej: "Comida"'
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Textarea
            label="Descripción (Opcional)"
            name="description"
            className="h-20 placeholder:self-start placeholder:top-0"
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Añade una breve descripción de la categoría"
          />
          <ColorPicker onPickColor={(color) => setFormData({ ...formData, color: color })} />
          <div className="fixed bottom-0 left-0 right-0 p-4 w-full flex items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
            <AsyncButton
              onClick={() => crear(formData)}
              // disabled={submitting || !formData.name || !formData.color || !formData.icon}
              text="Crear transacción"
            />
          </div>
        </form>
      </SectionBody>
    </div>
  );
};

export default CreateCategoryPage;
