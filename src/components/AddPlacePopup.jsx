import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const {values, handleChange, setValues} = useForm({ name: '', link: '' });

    useEffect(() => {
        if (isOpen) {
            setValues({ name: '', link: '' });
        }
    }, [isOpen, setValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="photo"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="title-input" className="popup__label">
                <input type="text" className="popup__input" id="title-input" name="name" value={values.name} onChange={handleChange} placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__input-error title-input-error"></span>
            </label>
            <label htmlFor="url-input" className="popup__label">
                <input type="url" className="popup__input" id="url-input" name="link" value={values.link} onChange={handleChange} placeholder="Ссылка на картинку" required />
                <span className="popup__input-error url-input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;