import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-bar-container">
      <Link to="/" className="nav-links">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-web-logo"
        />
      </Link>
      <ul className="links-list-container">
        <Link to="/" className="nav-links">
          <li> Home</li>
        </Link>
        <Link to="/jobs" className="nav-links">
          <li>Jobs</li>
        </Link>

        <li></li>
      </ul>
      <button type="button" onClick={onClickLogout} className="logOut-btn">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
