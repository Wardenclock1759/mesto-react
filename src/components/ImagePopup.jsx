const ImagePopup = (props) => {
    const { name, card, onClose} = props;
    const isOpen = card ? "popup_opened" : "";

    return (
        <div className={`popup popup_type_${name} ${isOpen}`} >
            <div className="popup__container">
                <button className="popup__close-button" id="btn_close_album" onClick={onClose}></button>
                <div className="popup__image" style={{ content: `url(${card?.link})` }}></div>
                <p className="popup__title">{card?.name}</p>
            </div>
        </div>
    );
};

export default ImagePopup