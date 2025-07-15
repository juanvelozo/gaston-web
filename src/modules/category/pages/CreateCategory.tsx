import { useState } from 'react';
import { ICreateCategoryDto } from '../model/category.controller';
import { useCategories } from '../hooks/useCategories.hook';
import EmojiButtonPicker from '../../../components/common/emojiPicker/EmojiPicker.component';
import colors from '../../../styles/colors';
import IconButton from '../../../components/common/iconButton/iconButton.component';
import { ArrowLeft } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/input/input.component';
import ColorPicker from '../../../components/common/colorPicker/ColorPicker.component';
import Textarea from '../../../components/common/textArea/textArea.component';
import Section from '../../../components/animated/section/Section.component';
import Formulario from '../../../components/common/formulario/formulario.component';

const CreateCategoryPage = (): React.JSX.Element => {
  const [formData, setFormData] = useState<ICreateCategoryDto>({
    name: '',
    description: '',
    color: '',
    icon: '😉',
  });
  const [mostrarEmojis, setMostrarEmojis] = useState<boolean>(false);

  const { crear } = useCategories();
  const navigate = useNavigate();

  const bgColor = formData.color ? formData.color : colors.coral;

  return (
    <div className="flex-1 h-screen overflow-y-screen">
      <Section
        title="Nueva categoría"
        bgColor={bgColor}
        left={<IconButton icon={<ArrowLeft />} onClick={() => navigate(-1)} />}
        bottom={
          <IconButton
            icon={formData.icon}
            onClick={() => setMostrarEmojis((prev) => !prev)}
            className="w-16 h-16 rounded-2xl text-3xl"
          />
        }
      >
        {mostrarEmojis ? (
          <EmojiButtonPicker
            onChange={(e) => {
              setMostrarEmojis(false);
              setFormData({ ...formData, icon: e });
            }}
          />
        ) : (
          <Formulario
            className="space-y-6"
            onSubmit={() => crear(formData)}
            buttonProps={{
              style: { background: bgColor },
            }}
            disabled={formData.name === '' || formData.color === '' || formData.icon === ''}
          >
            <Input
              label="Nombre"
              type="text"
              placeholder='Ej: "Comida"'
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <ColorPicker onPickColor={(color) => setFormData({ ...formData, color: color })} />
            <Textarea
              label="Descripción (Opcional)"
              name="description"
              // className="h-20 placeholder:self-start placeholder:top-0"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Añade una breve descripción de la categoría"
            />
          </Formulario>
        )}
      </Section>
    </div>
  );
};

export default CreateCategoryPage;
