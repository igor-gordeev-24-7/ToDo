import React from 'react';
import styles from './ErrorMessage.module.scss';
import type { ErrorMessageProps } from '../../types/ErrorMessageProps';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onClose,
	autoHideDuration
}) => {
	React.useEffect(() => {
		if(autoHideDuration && onClose) {
			const timer = setTimeout(() => {
				onClose();
			}, autoHideDuration);

			return () => clearTimeout(timer);
		}
	}, [autoHideDuration, onClose])

	return (
		<div className={styles.errorMessage}>
			<span className={styles.errorMessageText}>{message}</span>
			{onClose && (
				<button
					className={styles.errorMessageClose}
					onClick={onClose}
					aria-label='Закрыть сообщение об ошибке'
					>
					✕
				</button>
			)}
		</div>
	)
}

export default ErrorMessage;