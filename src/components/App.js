import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      currentUser: null,
      cards: []
    }
  }

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        this.setState({
          currentUser: userInfo,
          cards: initialCards
        })
      })
      .catch(error => console.log(error));
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    })
  }

  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    })
  }

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    })
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card.link
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null
    })
  }

  handleUpdateUser = (userInfo) => {
    api.updateUserInfo(userInfo)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleUpdateAvatar = (link) => {
    api.changeAvatar(link)
      .then(userInfo => {
        this.setState({
          currentUser: userInfo
        })
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleAddPlaceSubmit = (formData) => {
    api.uploadCard(formData)
      .then(newCard => {
        this.setState({
          cards: [newCard, ...this.state.cards]
        });
        this.closeAllPopups();
      })
      .catch(error => console.log(error));
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(item => item._id === this.state.currentUser._id);
    api.likeCard(card._id, isLiked)
      .then(newCard => {
        const newCards = this.state.cards.map(item => item._id === card._id ? newCard : item);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(response => {
        const newCards = this.state.cards.filter(item => item._id !== card._id);
        this.setState({
          cards: newCards
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
          {this.state.currentUser && <Main
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />}
          <Footer />

          {this.state.currentUser && <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />}

          <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />

          <PopupWithForm name="delete-photo" title="Вы уверены?" />

          <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />

          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default App;
