import React from 'react';

class PopupWithForm extends React.Component {
  render() {
    return (
      <div className={this.props.isOpen ? `popup popup_type_${this.props.name} popup_opened` : `popup popup_type_${this.props.name}`}>
        <form className="popup__form" name={this.props.name} noValidate onSubmit={this.props.onSubmit}>
          <h2 className="popup__title">{this.props.title}</h2>
          {this.props.children}
          <button className="popup__save-button" type="submit">Ок</button>
          <button className="popup__close-button" type="button" onClick={this.props.onClose} aria-label="Закрыть окно."></button>
        </form>
      </div>
    )
  }
}

export default PopupWithForm;
