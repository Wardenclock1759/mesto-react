const Card = ({ card, onCardClick }) => {
    const cardAlt = "Изображение" + card.name;

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__element">
            <div className="elements__container">
                <img className="elements__image" src={card.link} alt={cardAlt} onClick={handleClick}/>
                <button className="elements__delete-button"></button>
            </div>
            <div className="elements__content">
                <h2 className="elements__text">{card.name}</h2>
                <div className="element__wrapper">
                    <button className="elements__like-button" type="button"></button>
                    <p className="elements__counter">{card.likes.length}</p>
                </div>                
            </div>
        </li>
    );
};

export default Card;