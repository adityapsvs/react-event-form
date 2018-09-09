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
			date: moment(),
			time: moment(),
			allDay: false,
			eventName: '',
			location: ''
		}
	}

	handleDate = date => this.setState({ date: date })
	handleTime = time => this.setState({ time })
	changeAllDay = () => {
		let allDay = this.state.allDay
		this.setState({ allDay: !allDay })
	}
	handleEventName = event => this.setState({ eventName: event.target.value })
	setLocation = location => this.setState({ location: location })
	handleSubmit = (e) => {
		e.preventDefault()
		console.log(moment(this.state.date).format('DD/MM/YYYY'))
		console.log(moment(this.state.time).format('HH:mm:ss'))
		console.log(this.state.allDay)
		console.log(this.state.eventName)
		console.log(this.state.location)
	}

  render() {
    return(
      <form className='ui form' onSubmit={e => this.handleSubmit(e)}>
				<h1>Create Event</h1>
        <div className='field'>
          <label>Event Name</label>
          <input placeholder='Event Name' onChange={e => this.handleEventName(e)} />
        </div>
        <div>
          <DatePicker onChange={this.handleDate} selected={this.state.date} />
        </div>
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
									<TimePicker defaultValue={this.state.time} onChange={this.handleTime} />
								:
									null
							}
						</div>
					</div>
				</div>
				<div className='field'>
					<label>Location</label>
					{/* <input placeholder='Location' /> */}
					<Location address={this.state.location} handleChange={this.setLocation} />
				</div>
        <button type='submit' className='ui button' role='button'>
          Submit
        </button>
      </form>
    )
  }
}
