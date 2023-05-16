import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="avatar-input" className="popup__label">
                <input ref={avatarRef} type="url" className="popup__input" id="avatar-input" name="avatar" placeholder="Ссылка на картинку" required />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;