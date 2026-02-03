import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button
                        className="modal__close"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <Icon name="close" size={20} />
                    </button>
                </div>
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
