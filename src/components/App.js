import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Auth from '../utils/Auth.js';
import InfoTooltip from './InfoTooltip.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCardLink: null,
      selectedCardName: null,
      currentUser: null,
      cards: [],
      loggedIn: false,
      email: null,
      loginPageActive: true,
      message: null
    }
  }

  componentDidMount() {
    this.tokenCheck();
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        this.setState({
          currentUser: userInfo,
          cards: initialCards
        })
      })
      .catch(error => console.log(error));
  }

  tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      Auth.getContent(token)
        .then(res => {
          if (res) {
            this.setState({
              loggedIn: true,
              email: res.data.email,
              loginPageActive: false
            }, () => {
              this.props.history.push("/");
            });
          }
        });
    }
  }

  onLogin = (email) => {
    this.setState({
      loggedIn: true,
      email,
      loginPageActive: false
    })
  }

  onRegister = (email, password) => {
    Auth.register(email, password)
      .then(res => {
        if (res) {
          this.setState({
            message: 'Вы успешно зарегистрировались!'
          }, () => {
            this.props.history.push('/signin');
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так! Попробуйте ещё раз.'
          })
        }
      });
  }

  onSignOut = () => {
    this.setState({
      loggedIn: false,
      email: null,
      loginPageActive: true
    })
    localStorage.removeItem('token');
  }

  handleRedirect = () => {
    this.setState({
      loginPageActive: !this.state.loginPageActive
    })
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
      selectedCardLink: card.link,
      selectedCardName: card.name
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCardLink: null,
      selectedCardName: null,
      message: null
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
          <Header loggedIn={this.state.loggedIn} email={this.state.email} loginPageActive={this.state.loginPageActive}
            onSignOut={this.onSignOut} handleRedirect={this.handleRedirect} />
          <Switch>
            <ProtectedRoute exact path="/"
              loggedIn={this.state.loggedIn}
              onEditProfile={this.handleEditProfileClick}
              onAddPlace={this.handleAddPlaceClick}
              onEditAvatar={this.handleEditAvatarClick}
              onCardClick={this.handleCardClick}
              cards={this.state.cards}
              onCardLike={this.handleCardLike}
              onCardDelete={this.handleCardDelete}
              component={Main} />

            <Route path="/signin">
              <Login onLogin={this.onLogin} handleRedirect={this.handleRedirect} />
            </Route>

            <Route path="/signup">
              <Register onRegister={this.onRegister} handleRedirect={this.handleRedirect} />
            </Route>

            <Route>
              <Redirect to={`/${this.state.loggedIn ? '' : 'signin'}`} />
            </Route>
          </Switch>

          <Footer />

          {this.state.currentUser && <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} />}

          <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />

          <PopupWithForm name="delete-photo" title="Вы уверены?" />

          <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />

          <ImagePopup card={this.state.selectedCardLink} name={this.state.selectedCardName} onClose={this.closeAllPopups} />

          <InfoTooltip isOpen={this.state.isTooltipPopupOpen} onClose={this.closeAllPopups} message={this.state.message} />
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
