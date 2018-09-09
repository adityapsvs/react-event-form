import React, { Component } from 'react'
import Form from './components/Form'


class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='ui container'>
					<div className='ui center aligned huge header'>Event Form</div>
					<div className="ui divided three column grid">
						<div className="row">
							<div className="column"><Form /></div>
						</div>
					</div>
        </div>
      </div>
    )
  }
}

export default App
