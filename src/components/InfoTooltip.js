import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

class InfoTooltip extends React.Component {
  render() {
    return (
      <div className={this.props.message ? "popup popup_type_tooltip popup_opened" : "popup popup_type_tooltip"}>
        <div className="popup__form">
          <img className="popup__tooltip-image" src={this.props.message && this.props.message.includes("успешно") ? success : error} />
          <h2 className="popup__tooltip-text">{this.props.message}</h2>
          <button className="popup__close-button" type="button" onClick={this.props.onClose} aria-label="Закрыть окно."></button>
        </div>
      </div>
    )
  }
}

export default InfoTooltip;
