import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

/* Write your code here

import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    listOfItems: [],
    isFiltered: false,
  }

  onSubmitForm = e => {
    e.preventDefault()
    const {title, date} = this.state
    const newData = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStared: false,
    }
    this.setState(prev => ({
      listOfItems: [...prev.listOfItems, newData],
      title: '',
      date: '',
    }))
  }

  onFilterList = () => {
    this.setState(prev => ({isFiltered: !prev.isFiltered}))
  }

  onChangeStarToFilled = id => {
    this.setState(prev => ({
      listOfItems: prev.listOfItems.map(each => {
        if (each.id === id) {
          return {...each, isStared: !each.isStared}
        }
        return each
      }),
    }))
  }

  onChangeInputValue = e => {
    this.setState({title: e.target.value})
  }

  onChangeDateValue = e => {
    this.setState({date: e.target.value})
  }

  render() {
    const {title, date, listOfItems, isFiltered} = this.state
    const filteredItems = listOfItems.filter(each => each.isStared === true)
    const finalList = isFiltered ? filteredItems : listOfItems
    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="appointment-inputs">
            <form className="form" onSubmit={this.onSubmitForm}>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                type="text"
                placeholder="Title"
                value={title}
                className="input"
                id="title"
                onChange={this.onChangeInputValue}
              />
              <br />
              <label htmlFor="date" value={date}>
                DATE
              </label>
              <br />
              <input type="date" id="date" onChange={this.onChangeDateValue} />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              className="appointments-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <h1>Appointments</h1>
            <button
              type="button"
              onClick={this.onFilterList}
              className="bottom-button"
            >
              Starred
            </button>
          </div>
          <ul>
            {finalList.map(each => (
              <AppointmentItem
                key={each.id}
                onChangeStarToFilled={this.onChangeStarToFilled}
                eachItem={each}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
*/
