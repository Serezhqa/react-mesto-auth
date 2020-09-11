import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
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
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }

    this.props.onRegister(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="register">
        <p className="register__heading">Регистрация</p>
        <form className="register__form" onSubmit={this.handleSubmit}>
          <input className="register__input" id="email" name="email" type="email" required
            value={this.state.email} onChange={this.handleChange} placeholder="Email" />
          <input className="register__input" id="password" name="password" type="password" required
            value={this.state.password} onChange={this.handleChange} placeholder="Пароль" />
          <button className="register__submit-button" type="submit">Зарегистрироваться</button>
        </form>
        <Link className="register__link" to="signin" onClick={this.props.handleRedirect}>Уже зарегистрированы? Войти</Link>
      </div>
    )
  }
}

export default withRouter(Register);
