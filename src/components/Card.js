import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

class Card extends React.Component {
  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  handleLikeClick = () => {
    this.props.onCardLike(this.props.card);
  }

  handleCardDelete = () => {
    this.props.onCardDelete(this.props.card);
  }

  static contextType = CurrentUserContext;

  render() {
    const isOwn = this.props.card.owner._id === this.context._id;
    const isLiked = this.props.card.likes.some(item => item._id === this.context._id);
    return (
      <div className="elements__item">
        <button className="elements__image-button" type="button" onClick={this.handleClick} aria-label="Увеличить изображение.">
          <img className="elements__image" src={this.props.card.link} />
        </button>
        <div className="elements__container">
          <h2 className="elements__heading">{this.props.card.name}</h2>
          <div className="elements__like-container">
            <button className={isLiked ? "elements__like-button elements__like-button_active" : "elements__like-button"}
              type="button" aria-label="Поставить лайк." onClick={this.handleLikeClick} />
            <p className="elements__like-counter">{this.props.card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button className="elements__delete-button" type="button" aria-label="Удалить фото." onClick={this.handleCardDelete}/>}
      </div>
    )
  }
}

export default Card;
