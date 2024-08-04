import './index.css'

const FilterItems = props => {
  const {salaryRangesList, employmentTypesList, onUpdateEmpType, onUpdateSal} =
    props

  const onEmpTypeChange = event => {
    onUpdateEmpType(event.target.value)
  }

  const onSalaryChange = event => {
    onUpdateSal(event.target.value)
  }

  return (
    <>
      <h1 className="type-of-employment-head">Type of Employment</h1>
      <ul className="employment-Type-list-container">
        {employmentTypesList.map(eachEmpObj => {
          const {label, employmentTypeId} = eachEmpObj
          return (
            <li
              key={employmentTypeId}
              className="checkbox-label-list-item-container"
            >
              <input
                type="checkbox"
                value={employmentTypeId}
                id={employmentTypeId}
                onChange={onEmpTypeChange}
              />
              <label htmlFor={employmentTypeId} className="checkbox-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr />

      <h1 className="type-of-employment-head">Salary Range</h1>
      <ul className="employment-Type-list-container">
        {salaryRangesList.map(eachSalObj => {
          const {salaryRangeId, label} = eachSalObj
          return (
            <li
              key={salaryRangeId}
              className="checkbox-label-list-item-container"
            >
              <input
                type="radio"
                value={salaryRangeId}
                name="salary"
                id={salaryRangeId}
                onChange={onSalaryChange}
              />
              <label htmlFor={salaryRangeId} className="checkbox-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default FilterItems
