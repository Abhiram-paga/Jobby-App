import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    isErrorShown: false,
    errMsg: '',
    username: '',
    password: '',
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFormSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFormFailure = errMsg => {
    this.setState({errMsg, isErrorShown: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitFormSuccess(data.jwt_token)
    } else {
      this.onSubmitFormFailure(data.error_msg)
    }
  }

  render() {
    const {username, errMsg, password, isErrorShown} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="whole-login-bg-container">
        <div className="login-form-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-web-logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-label-container">
              <label htmlFor="username" className="login-form-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.onUsernameChange}
                value={username}
                className="login-form-input-ele"
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="password" className="login-form-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.onPasswordChange}
                value={password}
                className="login-form-input-ele"
              />
            </div>

            <button type="submit" className="login-form-btn">
              Login
            </button>
            {isErrorShown ? (
              <p className="login-form-err-msg">*{errMsg}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
