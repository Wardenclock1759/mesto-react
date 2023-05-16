import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if (!isOpen && currentUser) { 
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen, currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label for="name-input" class="popup__label">
                <input type="text" class="popup__input" id="name-input" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" minlength="2" maxlength="40" required />
                <span class="popup__input-error name-input-error"></span>
            </label>
            <label for="about-input" class="popup__label">
                <input type="text" class="popup__input" id="about-input" name="about" value={description} onChange={e => setDescription(e.target.value)} placeholder="О себе" minlength="2" maxlength="200" />
                <span class="popup__input-error about-input-error"></span>
            </label>
            <button class="popup__button" type="submit">Сохранить</button>
        </PopupWithForm>
    );
}

export default EditProfilePopup;