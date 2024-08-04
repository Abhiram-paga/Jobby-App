import Cookies from 'js-cookie'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import Profile from '../Profile'

import FilterItems from '../FilterItems'

import JobCard from '../JobCard'

import Loader from 'react-loader-spinner'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    employmentTypeList: [],
    salaryRange: '',
    searchInput: '',
    jobsApiStatus: jobsApiStatusConstants.initial,
    jobsDetails: {},
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: jobsApiStatusConstants.inProgress})
    const {employmentTypeList, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const empType = employmentTypeList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobs: data.jobs.map(eachObj => ({
          companyLogoUrl: eachObj.company_logo_url,
          employmentType: eachObj.employment_type,
          id: eachObj.id,
          jobDescription: eachObj.job_description,
          location: eachObj.location,
          packagePerAnnum: eachObj.package_per_annum,
          rating: eachObj.rating,
          title: eachObj.title,
        })),
        total: data.total,
      }
      this.setState({
        jobsDetails: updatedData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  onSearchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onUpdateSal = val => {
    this.setState({salaryRange: val}, this.getJobs)
  }

  onUpdateEmpType = value => {
    this.setState(prevState => {
      const {employmentTypeList} = prevState
      if (employmentTypeList.includes(value)) {
        return {
          employmentTypeList: employmentTypeList.filter(type => type !== value),
        }
      }
      return {employmentTypeList: [...employmentTypeList, value]}
    }, this.getJobs)
  }

  renderSuccessView = () => {
    const {jobsDetails} = this.state
    const {jobs = [], total} = jobsDetails

    return total !== 0 ? (
      <ul className='job-card-list-container'>
        {jobs.map(eachJob => (
          <JobCard jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className='no-jobs-Found-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          alt='no jobs'
          className='no-jobs-img'
        />
        <h1 className='no-job-Found-head'>No Jobs Found</h1>
        <p className='no-job-Found-para'>
          We could not find any jobs. Try other filter
        </p>
      </div>
    )
  }

  onRetryBtnClick = () => {
    this.getJobs()
  }

  renderFailureView = () => {
    return (
      <div>
        <img
          src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
          alt='failure view'
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page your are looking for.</p>
        <button type='button' onClick={this.onRetryBtnClick}>
          Retry
        </button>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div className='loader-container' data-testid='loader'>
        <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
      </div>
    )
  }

  onSearchClick = () => {
    this.getJobs()
  }

  render() {
    const {jobsApiStatus, searchInput} = this.state
    let cards
    switch (jobsApiStatus) {
      case jobsApiStatusConstants.success:
        cards = this.renderSuccessView()
        break
      case jobsApiStatusConstants.failure:
        cards = this.renderFailureView()
        break
      case jobsApiStatusConstants.inProgress:
        cards = this.renderLoader()
        break
      default:
        return null
    }

    return (
      <div className='jobs-whole-bg-container'>
        <Header />
        <div className='filters-job-card-container'>
          <div className='profile-filter-container'>
            <Profile />
            <hr />
            <FilterItems
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              onUpdateEmpType={this.onUpdateEmpType}
              onUpdateSal={this.onUpdateSal}
            />
          </div>
          <div className='team-card-container'>
            <div className='input-search-ele-container'>
              <input
                type='search'
                className='input-search-ele'
                placeholder='Search'
                value={searchInput}
                onChange={this.onSearchInputChange}
              />
              <button
                type='button'
                data-testid='searchButton'
                className='search-icon-btn'
                onClick={this.onSearchClick}
              >
                <BsSearch className='search-icon' />
              </button>
            </div>
            {cards}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
