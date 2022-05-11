import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class UsernameForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: ''
    }

    this.handleInput = this.handleInput.bind(this)
    this.submitUsername = this.submitUsername.bind(this)

  }

  submitUsername (event) {
    event.preventDefault();
    const { username } = this.state
    if (username === '') {
      return
    }

    this.props.setUsername(username)
  }

  handleInput (event) {
    if (event.key === 'Enter') {
      this.submitUsername(event)
    }

    this.setState({
      username: event.target.value
    })
  }

  render () {
    const { hidden } = this.props
    const { username } = this.state

    return (
      <div className={hidden ? 'userdata hidden' : 'userdata'}>
        <div className='userdata-container'>
          <form onSubmit={this.submitUsername}>
            <h4>Please set your username</h4>
            <input
              onChange={this.handleInput}
              value={username}
              placeholder='Username...'
              type='text'
              className='username'
              autoFocus
            />
            <button className='button-primary'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

UsernameForm.propTypes = {
  setUsername: PropTypes.func.isRequired
}
