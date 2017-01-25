import React, { Component, PropTypes }  from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { Link } from 'react-router'

class TicketEdit extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    }

  

    

    componentWillMount(){
        this.props.fetchTickets()
    }

    onSubmit(props){
        console.log('hello')
        this.props.editTicket(this.props.params.id, props)
            
    }

    render(){
        console.log('this.props', this.props)
        const { fields: { title, categories, content }, handleSubmit } = this.props

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>edit the ticket</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger': ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}  />

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
                    <input type="text" className="form-control" {...content}/>

                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/ticket" className="btn btn-danger">Cancel</Link>
            </form>
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

//  function mapStateToProps(state){
//      console.log(state)
//      return { ticket: state.ticket.ticket}
//  }

export default reduxForm({
    form: 'TicketsEditForm',
    fields: ['title', 'categories', 'content'],
    validate
}, 


state => ({
  initialValues: {
    title: state.ticket.ticket.title,
    categories: state.ticket.ticket.categories,
    content: state.ticket.ticket.content,
  }
})


, actions)(TicketEdit)