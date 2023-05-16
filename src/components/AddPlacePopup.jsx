import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({ name, link });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="photo"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label for="title-input" class="popup__label">
                <input type="text" class="popup__input" id="title-input" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" minlength="2" maxlength="30" required />
                <span class="popup__input-error title-input-error"></span>
            </label>
            <label for="url-input" class="popup__label">
                <input type="url" class="popup__input" id="url-input" name="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Ссылка на картинку" required />
                <span class="popup__input-error url-input-error"></span>
            </label>
            <button class="popup__button" type="submit">Создать</button>
        </PopupWithForm>
    );
}

export default AddPlacePopup;