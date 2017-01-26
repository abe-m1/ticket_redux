import React, { Component, PropTypes }  from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { Link } from 'react-router'
import { FileUpload } from 'redux-file-upload'

class TicketNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    onSubmit(props){
        this.props.createTicket(props)
            
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

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/ticket" className="btn btn-danger">Cancel</Link>
            </form>

            <FileUpload
  allowedFileTypes={['jpg', 'pdf']}
  data={{ type: 'picture' }}
  dropzoneId="fileUpload"
  url="https:/url.org/api/docs/upload"
>
  <button>
    Click or drag here
  </button>
</FileUpload>
            


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