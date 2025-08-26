import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';
import { Button } from '../button/Button.component';
import colors, { Colors } from '../../../styles/colors';
import { Xmark } from 'iconoir-react';
import IconButton from '../../common/iconButton/iconButton.component';

// Tus tipos de botón
export type ButtonVariant = 'primary' | 'secondary' | 'terciary';

export interface IButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

type ModalOptions = {
  content?: ReactNode;
  icon?: ReactNode;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  confirmProps?: IButtonProps;
  cancelText?: string;
  cancelProps?: IButtonProps;
  onConfirm?: () => void;
  onCancel?: () => void;
  backdropClose?: boolean;
  className?: string;
  bgColor?: keyof Colors;
};

type ModalState = {
  id: number;
  options: ModalOptions;
};

class ModalManager {
  private static instance: ModalManager;
  private subscribers: ((modals: ModalState[]) => void)[] = [];
  private modals: ModalState[] = [];
  private idCounter = 0;

  private constructor() {}

  static getInstance() {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }
    return ModalManager.instance;
  }

  open(options: ModalOptions): number {
    const id = ++this.idCounter;
    this.modals.push({ id, options });
    this.notify();
    return id;
  }

  close(id?: number) {
    if (typeof id === 'number') {
      this.modals = this.modals.filter((m) => m.id !== id);
    } else {
      this.modals.pop();
    }
    this.notify();
  }

  subscribe(cb: (modals: ModalState[]) => void) {
    this.subscribers.push(cb);
    cb(this.modals);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify() {
    this.subscribers.forEach((cb) => cb(this.modals));
  }
}

export const modalManager = ModalManager.getInstance();

export function ModalRoot() {
  const [modals, setModals] = React.useState<ModalState[]>([]);

  React.useEffect(() => modalManager.subscribe(setModals), []);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {modals.map(({ id, options }) => (
        <motion.div
          key={id}
          className={`modal-backdrop ${options.className || ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            if (options.backdropClose !== false) {
              modalManager.close(id);
              options.onCancel?.();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: options.bgColor ? colors[options.bgColor] : 'white',
              borderRadius: 10,
              padding: 32,
              minWidth: 340,
              maxWidth: '90vw',
              position: 'relative',
              boxShadow: '0 6px 32px 0 rgba(0,0,0,0.18)',
              textAlign: 'center',
            }}
          >
            {options.backdropClose && (
              <IconButton
                icon={<Xmark />}
                className="absolute top-4 right-4"
                onClick={() => {
                  modalManager.close(id);
                  options.onCancel?.();
                }}
              />
            )}
            {options.icon && <div style={{ fontSize: 48, marginBottom: 12 }}>{options.icon}</div>}
            {options.title && (
              <h2 style={{ fontWeight: 600, margin: '0 0 0.5em 0' }}>{options.title}</h2>
            )}
            {options.description && <div style={{ marginBottom: 18 }}>{options.description}</div>}
            {options.content}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 22 }}>
              {options.onCancel && (
                <Button
                  variant={options.cancelProps?.variant || 'secondary'}
                  {...options.cancelProps}
                  onClick={() => {
                    modalManager.close(id);
                    options.onCancel?.();
                  }}
                >
                  {options.cancelText || options.cancelProps?.children || 'Cancelar'}
                </Button>
              )}
              {options.onConfirm && (
                <Button
                  variant={options.confirmProps?.variant || 'primary'}
                  {...options.confirmProps}
                  onClick={() => {
                    modalManager.close(id);
                    options.onConfirm?.();
                  }}
                >
                  {options.confirmText || options.confirmProps?.children || 'Confirmar'}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </AnimatePresence>,
    document.body
  );
}
