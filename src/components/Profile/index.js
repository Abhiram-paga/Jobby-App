import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Profile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profileData: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        profileDetails: {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        },
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    const {profileDetails} = profileData
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-name-bio-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-container">
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let profileContainer
    switch (apiStatus) {
      case apiStatusConstants.success:
        profileContainer = this.renderSuccessView()
        break
      case apiStatusConstants.failure:
        profileContainer = this.renderFailureView()
        break
      case apiStatusConstants.inProgress:
        profileContainer = this.renderLoaderView()
        break
      default:
        return null
    }
    return profileContainer
  }
}
export default Profile
