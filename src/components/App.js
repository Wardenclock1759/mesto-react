import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeletePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        api.getProfileInfo()
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    const handleUpdateUser = (data) => {
        api.setProfileInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((error) => {
                console.error(`Error updating user data: ${error}`);
            });
    }

    const handleUpdateAvatar = (data) => {
        api.updateAvatar(data)
            .then((newUser) => {
                setCurrentUser(newUser);
                closeAllPopups();
            })
            .catch((error) => {
                console.error(`Error updating avatar: ${error}`);
            });
    }

    

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
        <CurrentUserContext.Provider value={currentUser}>
            {
                <div class="page">
                    <Header />
                    <Main 
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                    />
                    <Footer />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
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
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
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
            }
        </CurrentUserContext.Provider>
    );
}

export default App;
