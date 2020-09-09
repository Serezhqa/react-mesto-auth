import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

class EditProfilePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }

  static contextType = CurrentUserContext;

  componentDidMount() {
    this.setState({
      name: this.context.name,
      description: this.context.about
    })
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  handleDescriptionChange = (evt) => {
    this.setState({
      description: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onUpdateUser({
      name: this.state.name,
      about: this.state.description
    })
  }

  render() {
    return (
      <PopupWithForm name="edit-info" title="Редактировать профиль" isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit}>
        <input className="popup__input popup__input_type_username" id="username-input" type="text" name="username"
          placeholder="Имя пользователя" required minLength="2" maxLength="40" pattern="[а-яА-Яa-zA-Z -]+" value={this.state.name} onChange={this.handleNameChange} />
        <span className="popup__input-error" id="username-input-error" />
        <input className="popup__input popup__input_type_description" id="description-input" type="text" name="description"
          placeholder="О себе" required minLength="2" maxLength="200" value={this.state.description} onChange={this.handleDescriptionChange} />
        <span className="popup__input-error" id="description-input-error" />
      </PopupWithForm>
    )
  }
}

export default EditProfilePopup;
