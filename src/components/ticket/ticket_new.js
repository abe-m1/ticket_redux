import React, { Component, PropTypes }  from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { Link } from 'react-router'
import { findDOMNode } from 'react-dom'
// import UploadImage from './ticket_upload'

class TicketNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    onSubmit(props){
        event.preventDefault()
        const myFile = findDOMNode(this.refs.myFile).files[0]
        this.props.createTicket(props, myFile)
            
    }

    render(){
        const { fields: { title, categories, content }, handleSubmit } = this.props

        return(
            <div>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>create a new ticket</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />

                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                 <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': ''}`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />

                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger': ''}`}>
                    <label>Content</label>
                    <input type="text" className="form-control" {...content} />

                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                 <h4>Add file</h4>
                    <div className='row'>
                        <div className='col-xs-6 upload-form-wrapper'>
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
        //   disabled={!this.state.valid}
          className='btn btn-success' >
          Upload
        </button>
    </div>
                        </div>
                    </div>

                
                <Link to="/ticket" className="btn btn-danger">Cancel</Link>
            </form>

            </div>

            
  

        )
    }
}

function validate(values){
    const errors = {}

    if (!values.title){
        errors.title = 'please enter a title'
    }

    if (!values.categories){
        errors.categories = 'please enter categories'
    }

    if (!values.content){
        errors.content = 'enter some content'
    }

    return errors
}

export default reduxForm({
    form: 'TicketsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, actions)(TicketNew)