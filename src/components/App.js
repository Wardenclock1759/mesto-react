import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [cardToDelete, setCardToDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getProfileInfo()
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    useEffect(() => {
        api.getInitialCards()
          .then((cardData) => {
            setCards(cardData);
          })
          .catch((error) => {
            console.error(`Error fetching cards data: ${error}`);
          });
    }, []);

    const handleAddPlaceSubmit = (newCardData) => {
        api.addCard(newCardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => {
                console.error(`Error adding new card: ${error}`);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } 

    const handleDeleteCardClick = (card) => {
        setCardToDelete(card);
    };

    const handleDelete = (card) => {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
            closeAllPopups();
        })
        .catch((error) => {
            console.error(`Error deleting card: ${error}`);
        });
    }

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

    const handlePopupToggle = (toggleFunction) => {
        toggleFunction(prevState => !prevState);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeletePlacePopupOpen(false);
        setSelectedCard(null);
        setCardToDelete(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            {
                <div class="page">
                    <Header />
                    <Main 
                        onEditProfile={() => handlePopupToggle(setIsEditProfilePopupOpen)}
                        onAddPlace={() => handlePopupToggle(setIsAddPlacePopupOpen)}
                        onEditAvatar={() => handlePopupToggle(setIsEditAvatarPopupOpen)}
                        onCardDelete={(card) => {
                                handlePopupToggle(setIsDeletePlacePopupOpen);
                                handleDeleteCardClick(card);
                            }
                        }
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                    />
                    <Footer />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <DeleteCardPopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} onDeleteCard={handleDelete} cardToDelete={cardToDelete}/>
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
