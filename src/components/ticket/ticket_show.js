import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Link } from 'react-router'



class TicketShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount(){
        this.props.fetchTicket(this.props.params.id)
    }

    onDeleteClick(){
        this.props.deleteTicket(this.props.params.id)
          
    }

    onEditClick(){
        this.props.editTicket(this.props.params.id)
          
    }

    render(){
        const { ticket } = this.props

        if (!this.props.ticket){
            return <div>...loading</div>
        }

        return(
            <div>
                
                <button className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Ticket 
                </button>
                <Link to={"edit/" + ticket._id} >Edit Ticket</Link> 
                <h2>Title: {this.props.ticket.title}</h2>
                <h3>Category: {this.props.ticket.categories}</h3>
                <h3>Content: {this.props.ticket.content}</h3>
                <img  src={this.props.ticket.imageUrl} />
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return { ticket: state.ticket.ticket}
}

export default connect(mapStateToProps, actions)(TicketShow)