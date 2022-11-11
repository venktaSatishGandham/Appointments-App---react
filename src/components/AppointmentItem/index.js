import './index.css'

const AppointmentIem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button type="button" className="star-button" onClick={onClickStar}>
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentIem

/* Write your code here

const AppointmentItem = props => {
  const {eachItem, onChangeStarToFilled} = props
  const {id, title, date, isStared} = eachItem
  const onChangeStar = () => {
    onChangeStarToFilled(id)
  }
  return (
    <li className="each-item">
      <div>
        <p>{title}</p>
        <button type="button" testid="star" onClick={onChangeStar}>
          <img
            alt="star"
            src={
              isStared
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
          />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
*/
