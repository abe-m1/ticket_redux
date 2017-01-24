import { FETCH_TICKETS, FETCH_TICKET, FETCH_MESSAGE  } from '../actions/index'

const INITIAL_STATE = { all: [], ticket: null}

export default function(state = INITIAL_STATE, action){
    console.log('ACTION', action)
    switch(action.type){
        case 'FETCH_TICKETS':
        console.log('we are called')
            return { ...state, all: action.payload}

        case FETCH_TICKET:
            return { ...state, ticket: action.payload.data}
        
        

        default:
        console.log('hey')
            return state
    }
}