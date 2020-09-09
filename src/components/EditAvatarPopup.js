import React from 'react';
import PopupWithForm from './PopupWithForm.js';

class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.imageLinkRef = React.createRef();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onUpdateAvatar(this.imageLinkRef.current.value);
    this.imageLinkRef.current.value = '';
  }

  render() {
    return (
      <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit}>
        <input className="popup__input popup__input_type_link" id="avatar-link-input" type="url" name="link"
          placeholder="Ссылка на картинку" required ref={this.imageLinkRef} />
        <span className="popup__input-error" id="avatar-link-input-error" />
      </PopupWithForm>
    )
  }
}

export default EditAvatarPopup;
