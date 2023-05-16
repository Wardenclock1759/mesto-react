import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, cardToDelete }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onDeleteCard(cardToDelete);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="delete"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default DeleteCardPopup;