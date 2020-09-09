import React from 'react';
import PopupWithForm from './PopupWithForm.js';

class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: ''
    }
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  handleLinkChange = (evt) => {
    this.setState({
      link: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link
    })
    this.setState({
      name: '',
      link: ''
    })
  }

  render() {
    return (
      <PopupWithForm name="add-photo" title="Новое место" isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit}>
        <input className="popup__input popup__input_type_place" id="place-input" type="text" name="name"
          placeholder="Название" required maxLength="30" value={this.state.name} onChange={this.handleNameChange} />
        <span className="popup__input-error" id="place-input-error"></span>
        <input className="popup__input popup__input_type_link" id="link-input" type="url" name="link"
          placeholder="Ссылка на картинку" required value={this.state.link} onChange={this.handleLinkChange} />
        <span className="popup__input-error" id="link-input-error"></span>
      </PopupWithForm>
    )
  }
}

export default AddPlacePopup;
