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

    render(){
        const { ticket } = this.props

        if (!this.props.ticket){
            return <div>...loading</div>
        }

        return(
            <div>
                <Link to="/ticket">Back to Index</Link>
                <button className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Ticket 
                </button>

                <h3>Categories: {this.props.ticket.categories}</h3>
                <p>{this.props.ticket.content}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { ticket: state.ticket.ticket}
}

export default connect(mapStateToProps, actions)(TicketShow)