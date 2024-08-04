import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {FaFolder} from 'react-icons/fa'

import {FaExternalLinkAlt} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const jobItemDetailsApiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    jobItemDetailsApi: jobItemDetailsApiConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobItemDetailsApi: jobItemDetailsApiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          title: data.job_details.title,
          skills: data.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }

      this.setState({
        jobItemDetailsApi: jobItemDetailsApiConstants.success,
        jobItemDetails: updatedData,
      })
    } else {
      this.setState({jobItemDetailsApi: jobItemDetailsApiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobItemDetails} = this.state
    const {jobDetails = {}, similarJobs = []} = jobItemDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills = [],
      lifeAtCompany = {},
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-item-details-main-container">
        <div className="job-item-details-container">
          <div className="companyLogo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-card-company-logo"
            />
            <div>
              <h1 className="job-card-title">{title}</h1>
              <p className="job-card-rating">
                <FaStar className="star-icon" /> {rating}
              </p>
            </div>
          </div>
          <ul className="location-salary-list-container">
            <li className="location-employmentType-list-item">
              <div className="location-icon-container">
                <MdLocationOn className="location-icon" />
                <p className="location-para">{location}</p>
              </div>
              <div className="location-icon-container">
                <FaFolder className="location-icon" />
                <p className="location-para">{employmentType}</p>
              </div>
            </li>
            <li className="location-para">
              <p>{packagePerAnnum}</p>
            </li>
          </ul>
          <hr />
          <div>
            <div className="job-details-head-anchor-container">
              <h1 className="job-card-desc">Description</h1>
              <a href={companyWebsiteUrl} target="blank" className="anchor-tag">
                Visit <FaExternalLinkAlt />
              </a>
            </div>
            <p className="team-card-Description-para">{jobDescription}</p>
            <h1 className="job-item-details-skill-head">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => {
                const {name, imageUrl} = eachSkill
                return (
                  <li className="skills-list-item-container" key={id}>
                    <img src={imageUrl} alt={name} className="skills-img" />
                    <p className="skill-name">{name}</p>
                  </li>
                )
              })}
            </ul>
            <h1 className="job-item-details-skill-head">Life at Company</h1>
            <div className="lifeAtCompany-description-img-container">
              <p className="lifeAtCompany-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <h1 className="job-item-details-skill-head">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachJob => {
            const {
              companyLogoUrl,
              employmentType,
              jobDescription,
              location,
              rating,
              title,
              id,
            } = eachJob
            return (
              <li className="similarJobs-list-item-container" key={id}>
                <div className="companyLogo-title-container">
                  <img
                    src={companyLogoUrl}
                    alt="similar job company logo"
                    className="job-card-company-logo"
                  />
                  <div>
                    <h1 className="job-card-title">{title}</h1>
                    <p className="job-card-rating">
                      <FaStar className="star-icon" /> {rating}
                    </p>
                  </div>
                </div>
                <div>
                  <h1 className="job-card-desc">Description</h1>
                  <p className="team-card-Description-para">{jobDescription}</p>
                </div>
                <ul className="location-salary-list-container">
                  <li className="similar-jobs-location-employmentType-list-item">
                    <div className="location-icon-container">
                      <MdLocationOn className="location-icon" />
                      <p className="location-para">{location}</p>
                    </div>
                    <div className="location-icon-container">
                      <FaFolder className="location-icon" />
                      <p className="location-para">{employmentType}</p>
                    </div>
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )
  onRetryBtnClick = () => {
    this.getJobDetails()
  }
  renderFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.onRetryBtnClick}>
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {jobItemDetailsApi} = this.state
    let con
    switch (jobItemDetailsApi) {
      case jobItemDetailsApiConstants.success:
        con = this.renderSuccessView()
        break
      case jobItemDetailsApiConstants.failure:
        con = this.renderFailureView()
        break
      case jobItemDetailsApiConstants.inProgress:
        con = this.renderLoaderView()
        break
      default:
        return null
    }
    return (
      <div className="job-jobDetails-bg-container">
        <Header />
        {con}
      </div>
    )
  }
}
export default JobItemDetails
