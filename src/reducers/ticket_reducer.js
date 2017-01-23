import { FETCH_TICKETS, FETCH_TICKET } from '../actions/index'

const INITIAL_STATE = { all: [], ticket: null }

export default function(state= INITIAL_STATE, action){
    switch(action.type){
        case FETCH_TICKET:
            return {...state, ticket: action.payload.data}

        case FETCH_TICKETS:
            return {...state, all: action.payload.data}
    }
}