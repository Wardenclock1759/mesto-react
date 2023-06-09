const PopupWithForm = (props) => {
    const { title, name, buttonText, children, isOpen, onSubmit, onClose} = props;

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <h2 className="popup__text">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;