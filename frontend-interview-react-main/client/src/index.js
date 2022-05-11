import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import io from 'socket.io-client'

import './vendor/normalize.css'
import './vendor/skeleton.css'
import './index.css'

import Header from './Header'
import UsernameForm from './UsernameForm'
import UsersListing from './UsersListing'
import ChatMessages from './ChatMessages'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      joiningAlert: ''
    }

    this.messageField = React.createRef()

    this.initChat = this.initChat.bind(this)
    this.socket = io('http://localhost:3001')
    this.socket.on('joining-alert', msg => {
      this.setState({
        joiningAlert: msg
      })
      setTimeout(()=> {
        this.setState({
          joiningAlert: ''
        })
      }, 5000)
    })
  }

  initChat (username) {
    this.setState({
      username: username
    })
   
    this.socket.emit('username', username)
    this.socket.emit('users')
  }

  render () {
    const { username, joiningAlert } = this.state

    return (
      <Fragment>
       { joiningAlert != ''  && (<div className='joining-alert'>{joiningAlert}</div>)}
        <UsernameForm setUsername={this.initChat} hidden={username !== ''} />
        <div className={username === '' ? 'chat hidden' : 'chat'}>
          <Header />
          <UsersListing />
          <ChatMessages />
        </div>
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
