import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {FaFolder} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className='card-link'>
      <li className='card-list-item-container'>
        <div className='companyLogo-title-container'>
          <img
            src={companyLogoUrl}
            alt='company logo'
            className='job-card-company-logo'
          />
          <div>
            <h1 className='job-card-title'>{title}</h1>
            <p className='job-card-rating'>
              <FaStar className='star-icon' /> {rating}
            </p>
          </div>
        </div>
        <ul className='location-salary-list-container'>
          <li className='location-employmentType-list-item'>
            <div className='location-icon-container'>
              <MdLocationOn className='location-icon' />
              <p className='location-para'>{location}</p>
            </div>
            <div className='location-icon-container'>
              <FaFolder className='location-icon' />
              <p className='location-para'>{employmentType}</p>
            </div>
          </li>
          <li className='location-para'>{packagePerAnnum}</li>
        </ul>
        <hr />
        <div>
          <h1 className='job-card-desc'>Description</h1>
          <p className='team-card-Description-para'>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
