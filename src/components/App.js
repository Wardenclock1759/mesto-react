import React, { useState } from 'react';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeletePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <div class="page">
            <Header />
            <Main 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                title="Редактировать профиль"
                name="profile"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <label for="name-input" class="popup__label">
                    <input type="text" class="popup__input" id="name-input" name="name" placeholder="Имя" minlength="2" maxlength="40" required />
                    <span class="popup__input-error name-input-error"></span>
                </label>
                <label for="about-input" class="popup__label">
                    <input type="text" class="popup__input" id="about-input" name="about" placeholder="О себе" minlength="2" maxlength="200" />
                    <span class="popup__input-error about-input-error"></span>
                </label>
                <button class="popup__button" type="submit">Сохранить</button>
            </PopupWithForm>
            <PopupWithForm
                title="Новое место"
                name="photo"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <label for="title-input" class="popup__label">
                    <input type="text" class="popup__input" id="title-input" name="name" placeholder="Название" minlength="2" maxlength="30" required />
                    <span class="popup__input-error title-input-error"></span>
                </label>
                <label for="url-input" class="popup__label">
                    <input type="url" class="popup__input" id="url-input" name="link" placeholder="Ссылка на картинку" required />
                    <span class="popup__input-error url-input-error"></span>
                </label>
                <button class="popup__button" type="submit">Создать</button>
            </PopupWithForm>
            <PopupWithForm
                title="Обновить аватар"
                name="avatar"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <label for="avatar-input" class="popup__label">
                    <input type="url" class="popup__input" id="avatar-input" name="avatar" placeholder="Ссылка на картинку" required />
                    <span class="popup__input-error avatar-input-error"></span>
                </label>
                <button class="popup__button" type="submit">Сохранить</button>
            </PopupWithForm>
            <PopupWithForm
                title="Вы уверены?"
                name="delete"
                isOpen={isDeletePlacePopupOpen}
                onClose={closeAllPopups}
            >
                <button class="popup__button">Да</button>
            </PopupWithForm>
            <ImagePopup 
                name="album"
                card={selectedCard} 
                onClose={closeAllPopups} 
            />
        </div>
    );
}

export default App;
