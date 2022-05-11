import React, { Component } from 'react'
import './index.css'
import io from 'socket.io-client'

export default class UsersListing extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: []
    }

    this.socket = io('http://localhost:3001')
    this.socket.emit('users')
    this.socket.on('users', users => {
      this.setState({
        users: users
      })
    })
  }

  render () {
    return (
      <>
        <h4 className='pl-10'>Users</h4>
        <div>{this.state.users.length > 0 ? 
        <ul className='users'>
            {this.state.users.map((user, index) => (
              <li className={user.online ? 'active': ''} key={index}><div>{user.name}</div></li>
            ))}
          </ul>
        : ''}</div>
      </>
      
    )
  }
}
