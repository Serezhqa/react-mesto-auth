import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../utils/Auth.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.email || !this.state.password) {
      return;
    }

    Auth.authorize(this.state.email, this.state.password)
      .then(data => {
        if (data.token) {
          this.props.onLogin(this.state.email);
          this.setState({ email: '', password: '' }, () => {
            this.props.history.push('/');
          })
        }
      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="login">
        <p className="login__heading">Вход</p>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input className="login__input" id="email" name="email" type="email" required
            value={this.state.email} onChange={this.handleChange} placeholder="Email" />
          <input className="login__input" id="password" name="password" type="password" required
            value={this.state.password} onChange={this.handleChange} placeholder="Пароль" />
          <button className="login__submit-button" type="submit">Войти</button>
        </form>
        <Link className="login__link" to="signup" onClick={this.props.handleRedirect}>Ещё не зарегистрированы? Регистрация</Link>
      </div>
    )
  }
}

export default withRouter(Login);
