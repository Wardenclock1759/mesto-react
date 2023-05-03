const PopupWithForm = (props) => {
    const { title, name, children, isOpen, onSubmit, onClose} = props;

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <h2 className="popup__text">{title}</h2>
                    {children}
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;