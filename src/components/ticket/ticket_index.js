import React, { Component } from 'react'
import { connect} from 'react-redux'

import * as actions from '../actions/index'
import { Link } from 'react-router'

class TicketIndex extends Component{
    componentWillMount(){
        this.props.fetchTickets()
    }

    renderTickets(){
        return this.props.tickets.map((ticket)=>{
            return(
                <li className="list-group-item" key={ticket.id}>
                    <Link to={"ticket/" + ticket.id} >
                        <span className="pull-xs-right">{ticket.categories} </span>
                        <strong> {post.title} </strong>
                    </Link>
                </li>
            )
        })
    }

    render(){
        return(
            <div>
                <div className="text-xs-right">
                    <Link to="/ticket/new" className="btn btn-primary">
                    add a new ticket
                    </Link>
                </div>

                <h2>Ticktets</h2>
                <ul className="list-group">
                    {this.renderTickets()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { posts: state.ticket.all }
}

export default connect(mapStateToProps, { fetchTickets: fetchTickets})(TicketIndex)
