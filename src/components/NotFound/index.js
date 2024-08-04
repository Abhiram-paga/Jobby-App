import './index.css'

const NotFound = () => {
  return (
    <div className="page-not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="page-not-found-head">Page Not Found</h1>
      <p className="page-not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  )
}
export default NotFound
