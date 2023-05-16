import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import edit from "../images/edit.svg";
import Card from "../components/Card"

const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper">
                    {user && <img src={user.avatar} alt="Аватар пользователя" className="profile__image" />}
                    <div className="profile__overlay" onClick={onEditAvatar}>
                        <img src={edit} alt="Иконка редактирования" className="profile__icon" />
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{user && user.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{user && user.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <div className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Main;