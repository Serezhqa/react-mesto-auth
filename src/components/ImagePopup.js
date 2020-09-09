import React from 'react';

class ImagePopup extends React.Component {
  render() {
    return (
      <div className={this.props.card ? "popup popup_type_open-photo popup_opened" : "popup popup_type_open-photo"}>
        <div className="popup__photo-container">
          <img className="popup__image" src={this.props.card}/>
          <h2 className="popup__heading"></h2>
          <button className="popup__close-button" type="button" onClick={this.props.onClose} aria-label="Закрыть окно."></button>
        </div>
      </div>
    )
  }
}

export default ImagePopup;
