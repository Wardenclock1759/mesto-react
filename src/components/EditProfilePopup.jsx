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
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="name-input" className="popup__label">
                <input type="text" className="popup__input" id="name-input" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label htmlFor="about-input" className="popup__label">
                <input type="text" className="popup__input" id="about-input" name="about" value={description} onChange={e => setDescription(e.target.value)} placeholder="О себе" minLength="2" maxLength="200" />
                <span className="popup__input-error about-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;