import {
  UserCircle,
  Dollar,
  Lock,
  HelpCircle,
  Mail,
  Page,
  ShieldCheck,
  InfoCircle,
} from 'iconoir-react';
import ItemList from '../../../components/common/ItemList/ItemList.component';
import { ProfileSection } from '../model/profile.model';

const perfilSections: ProfileSection[] = [
  {
    title: 'Cuenta',
    items: [
      {
        icon: <UserCircle className="w-6 h-6" />,
        iconBgColor: '#E6F0FF',
        title: 'Información personal',
        label: 'Edita tu perfil y datos',
      },
      {
        icon: <Dollar className="w-6 h-6" />,
        iconBgColor: '#E6FCEF',
        title: 'Moneda',
        label: 'Selecciona tu divisa favorita',
        value: 'USD',
      },
      //   {
      //     icon: <Calendar className="w-6 h-6" />,
      //     iconBgColor: '#F5EFFF',
      //     title: 'Recordatorios',
      //     label: 'Configura notificaciones',
      //   },
    ],
  },
  {
    title: 'Seguridad',
    items: [
      {
        icon: <Lock className="w-6 h-6" />,
        iconBgColor: '#FFEFEF',
        title: 'Cambiar contraseña',
        label: 'Actualiza tu contraseña',
      },
      //   {
      //     icon: <Fingerprint className="w-6 h-6" />,
      //     iconBgColor: '#FFF3E6',
      //     title: 'Autenticación biométrica',
      //     label: 'Huella dactilar y Face ID',
      //     value: 'Activado',
      //     valueColor: '#10B981',
      //   },
    ],
  },
  {
    title: 'Soporte',
    items: [
      {
        icon: <HelpCircle className="w-6 h-6" />,
        iconBgColor: '#EEF4FF',
        title: 'Centro de ayuda',
        label: 'Preguntas frecuentes',
      },
      {
        icon: <Mail className="w-6 h-6" />,
        iconBgColor: '#E9FBF0',
        title: 'Contactar soporte',
        label: 'Envíanos un mensaje',
      },
      //   {
      //     icon: <Star className="w-6 h-6" />,
      //     iconBgColor: '#FFF9E6',
      //     title: 'Calificar app',
      //     label: 'Déjanos tu opinión',
      //   },
    ],
  },
  {
    title: 'Acerca de',
    items: [
      {
        icon: <Page className="w-6 h-6" />,
        iconBgColor: '#F2F2F2',
        title: 'Términos y condiciones',
        label: 'Lee nuestros términos',
      },
      {
        icon: <ShieldCheck className="w-6 h-6" />,
        iconBgColor: '#F4F4F4',
        title: 'Política de privacidad',
        label: 'Cómo protegemos tus datos',
      },
      {
        icon: <InfoCircle className="w-6 h-6" />,
        iconBgColor: '#F9F9F9',
        title: 'Versión',
        value: '1.0.0',
      },
    ],
  },
];

const PerfilSections = () => {
  return (
    <div className="space-y-6">
      {perfilSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
          {section.items.map((item, index) => (
            <ItemList key={index} index={index} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PerfilSections;
