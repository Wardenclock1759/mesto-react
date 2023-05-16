import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, cardToDelete }) {

    const handleSubmit = (e) => {
        console.log(cardToDelete)
        e.preventDefault();
        onDeleteCard(cardToDelete);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="delete"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <button class="popup__button" type="submit">Да</button>
        </PopupWithForm>
    );
}

export default DeleteCardPopup;