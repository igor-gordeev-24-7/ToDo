export interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  autoHideDuration?: number;
}