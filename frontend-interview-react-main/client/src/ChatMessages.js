import React, { Component, Fragment } from 'react'
import './index.css'
import io from 'socket.io-client'

export default class ChatMessages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: [],
      messageInput: '',
      typingMsg: '',
    }

    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleMessageInput = this.handleMessageInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.socket = io('http://localhost:3001')
    this.socket.on('message', msgPayload => {
      this.setState({
        messages: [...this.state.messages, msgPayload]
      })
    })
    this.socket.emit('typing')
    this.socket.on('typing', message => {
      this.setState({
        typingMsg: message
      })
    })
  }

  handleMessageInput (e) {
    this.setState({ messageInput: e.target.value })
  }

  handleKeyDown (e) {
    if (e.key === 'Enter') {
      this.handleSendMessage()
    }
  }

  handleSendMessage () {
    const { messageInput } = this.state
    if (messageInput === '') return
    this.socket.emit('message', messageInput)
    this.setState({ messageInput: '' })
    
  }

  render () {
    const { messages, messageInput, typingMsg } = this.state

    return (
      <Fragment>
        <h4 className='pl-10'>Chat Messages</h4>
        {messages.length == 0 ? <div className='pl-10'>There are no messages.</div>: '' }
        <ul className='messages'>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        { messageInput != ''  && (<div className='msg-typing-notify'>{typingMsg}</div>)}
        <div className='msg-form'>
          <input
            value={messageInput}
            onChange={this.handleMessageInput}
            onKeyDown={this.handleKeyDown}
            className='msg-input'
            autoComplete='off'
            autoFocus
          />
          <button onClick={this.handleSendMessage} className='msg-button-primary' type='button'>
            Submit
          </button>
        </div>
      </Fragment>
    )
  }
}
