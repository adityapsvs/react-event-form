import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker'
import Location from './Location'

import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';

export default class Form extends Component {
	constructor(props) {
		super(props)
		this.state = {
			eventDate: moment(),
			eventTime: moment(),
			allDay: false,
			eventName: '',
			eventLocation: ''
		}
	}

	handleDate = date => this.setState({ eventDate: date })
	handleTime = time => this.setState({ eventTime: time })
	changeAllDay = () => {
		let allDay = this.state.allDay
		this.setState({ allDay: !allDay })
	}
	handleEventName = event => this.setState({ eventName: event.target.value })
	setLocation = location => this.setState({ eventLocation: location })
	handleSubmit = (e) => {
		e.preventDefault()
		let currEventDetails = this.state
		currEventDetails.eventDate = moment(this.state.eventDate).format('DD/MM/YYYY')
		if(this.state.allDay) currEventDetails.eventTime = 'All Day'
		else currEventDetails.eventTime = moment(this.state.eventTime).format('HH:mm:ss')
		let prevEventDetails = {}
		if(localStorage.getItem('eventDetails'))
			prevEventDetails = JSON.parse(localStorage.getItem('eventDetails'))
		localStorage.setItem('eventDetails', JSON.stringify([...prevEventDetails, currEventDetails]))
		this.setState({
			eventDate: moment(),
			eventTime: moment(),
			allDay: false,
			eventName: '',
			eventLocation: ''
		})
	}

  render() {
    return(
      <form className='ui form' onSubmit={e => this.handleSubmit(e)}>
				<h1>Create Event</h1>
        <div className='field'>
          <label>Event Name</label>
          <input placeholder='Event Name' onChange={e => this.handleEventName(e)} />
        </div>
        <div className='field'>
					<label>Date</label>
          <DatePicker onChange={this.handleDate} selected={this.state.eventDate} />
        </div>
				<div className='field'>
					<label>Time</label>
					<div className='ui divided two column grid'>
						<div className='row'>
							<div className='column'>
								<div className='field'>
				          <div className='ui checkbox'>
				            <input type='checkbox' onChange={this.changeAllDay} />
				            <label>All day?</label>
				          </div>
				        </div>
							</div>
							<div className='column' >
								{
									!this.state.allDay ?
										<TimePicker defaultValue={this.state.eventTime} onChange={this.handleTime} />
									:
										null
								}
							</div>
						</div>
					</div>
				</div>
				<div className='field'>
					<label>Location</label>
					{/* <input placeholder='Location' /> */}
					<Location address={this.state.eventLocation} handleChange={this.setLocation} />
				</div>
        <button type='submit' className='ui button' role='button'>
          Submit
        </button>
      </form>
    )
  }
}
