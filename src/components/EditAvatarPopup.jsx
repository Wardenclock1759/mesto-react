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
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label for="avatar-input" class="popup__label">
                <input ref={avatarRef} type="url" class="popup__input" id="avatar-input" name="avatar" placeholder="Ссылка на картинку" required />
                <span class="popup__input-error avatar-input-error"></span>
            </label>
            <button class="popup__button" type="submit">Сохранить</button>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;