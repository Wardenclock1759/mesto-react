import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, handleDeleteClick }) => {
    const user = useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const isLiked = card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName = ( 
        `elements__like-button ${isLiked && 'elements__like-button_active'}` 
    );; 

    const cardAlt = "Изображение" + card.name;

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__element">
            <div className="elements__container">
                <img className="elements__image" src={card.link} alt={cardAlt} onClick={handleClick}/>
                {isOwn && <button className='elements__delete-button' onClick={handleDeleteClick} />} 
            </div>
            <div className="elements__content">
                <h2 className="elements__text">{card.name}</h2>
                <div className="element__wrapper">
                    <button className={cardLikeButtonClassName} type="button"></button>
                    <p className="elements__counter">{card.likes.length}</p>
                </div>                
            </div>
        </li>
    );
};

export default Card;