import React, { useState } from 'react';
import { ArrowDownRightCircle, ArrowUpRightCircle, LogIn, LogOut } from 'iconoir-react';
import ButtonGroup from '../../../../components/animated/ButtonGroup/ButtonGroup.component';

// Define tus tipos
export type SessionActions = 'LOGIN' | 'REGISTER';

// Tus opciones, igual que antes
const ISessionButtonValues = {
  LOGIN: {
    label: 'Inicio de sesión',
    icon: (isSelected: boolean) => <LogIn color={isSelected ? '#3A7D44' : '#fff'} />,
  },
  REGISTER: {
    label: 'Registrarse',
    icon: (isSelected: boolean) => <LogOut color={isSelected ? '#3A7D44' : '#fff'} />,
  },
} as const;

const SessionButtons = ({ onChange }: ISessionButtons) => {
  const [selected, setSelected] = useState<SessionActions>('LOGIN');

  return (
    <ButtonGroup<SessionActions>
      options={ISessionButtonValues}
      value={selected}
      onChange={(val) => {
        setSelected(val);
        onChange?.(val);
      }}
    />
  );
};

interface ISessionButtons {
  onChange?: (value: SessionActions) => void;
}

export default SessionButtons;
