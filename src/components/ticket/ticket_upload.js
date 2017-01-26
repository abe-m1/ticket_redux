import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

export default class UploadImage extends Component {
  constructor(props) {
    super(props)
    this.state = { valid: false }
    this.onFileChange = this.onFileChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  onFileChange(event) {
    if (event.target.files[0]) {
      console.log('file',event.target.files)
      this.setState( {valid: true} )
    } else {
      this.setState( {valid: false} )
    }
  }
  submit(event) {
    event.preventDefault()
    const myFile = findDOMNode(this.refs.myFile).files[0]
    this.props.handleSubmit(myFile)
  }
  render() {
    return (
    //   <form className='add-product' onSubmit={this.submit}>
        <div>
        <div className='form-group'>
          <input
            type='file'
            ref='myFile'
            onChange={this.onFileChange}
            className='form-control' />
        </div>
        <button
          type='submit'
          disabled={!this.state.valid}
          className='btn btn-success' >
          Upload
        </button>
    </div>
    )
  }
}