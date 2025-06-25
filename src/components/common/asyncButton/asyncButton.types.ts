export interface AsyncButtonProps {
  onClick: () => Promise<void>;
  onSuccess?: () => void;
  disabled?: boolean;
  text?: string;
  loadingText?: string;
}
