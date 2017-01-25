import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER , 
        AUTH_ERROR, 
        UNAUTH_USER, 
        FETCH_MESSAGE,
        FETCH_TICKETS,
        CREATE_TICKET,
        FETCH_TICKET,
        DELETE_TICKET
        } from './types'
const ROOT_URL = "http://localhost:5000"

export function signinUser({email, password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                dispatch({ type: AUTH_USER})

                localStorage.setItem('token', response.data.token)

                browserHistory.push('/ticket')
            })
            .catch(()=>{
                dispatch(authError('bad login info'))
            })
    }
}

export function signoutUser(){
    localStorage.removeItem('token')
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({email, password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`, { email, password})
            .then(response =>{
                dispatch({ type: AUTH_USER})
                localStorage.setItem('token', response.data.token)
                browserHistory.push('/ticket')
            })
            .catch(response => dispatch(authError(response.data.error)))
    }
}

export function authError(error){
    console.log(error)
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage(){
    return function(dispatch){
        axios.get(ROOT_URL, { headers: {authorization: localStorage.getItem('token')}
        })
        .then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        })
    }
}

 export function fetchTickets(){
     return function(dispatch){
         axios.get(`${ ROOT_URL}/ticket`, { headers: {authorization: localStorage.getItem('token')}
         })
         .then(response => {
             dispatch({
                 type: FETCH_TICKETS,
                 payload: response.data.ticket
             })
         })
     }
 }

export function createTicket({ title, categories, content}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/ticket`, { title, categories, content }, { headers: {authorization: localStorage.getItem('token')}})
            .then(response =>{
                
                
                browserHistory.push('/ticket')
                dispatch({ type: FETCH_TICKETS})
            })
            
    }
}

 export function fetchTicket(id){
     return function(dispatch){
         axios.get(`${ ROOT_URL}/ticket/${id}`, { headers: {authorization: localStorage.getItem('token')}
         })
         .then(response => {
             dispatch({
                 type: FETCH_TICKET,
                 payload: response.data.ticket
             })
         })
     }
 }


 export function deleteTicket(id){
     return function(dispatch){
         axios.delete(`${ROOT_URL}/ticket/${id}`, { headers: {authorization: localStorage.getItem('token')}})
            .then(response =>{
                
                
                browserHistory.push('/ticket')
                dispatch({ type: FETCH_TICKETS})
            })

     }
    
    
}


 export function editTicket(id, data){
     console.log('HIT')
     console.log(id)
     console.log(data)
     const {title, categories, content} = data
     return function(dispatch){
         axios.put(`${ROOT_URL}/ticket/${id}`, { title, categories, content }, { headers: {authorization: localStorage.getItem('token')}})
            .then(response =>{  
                console.log('this is edit response', response)          
                browserHistory.push('/ticket')
                dispatch({ type: FETCH_TICKETS})
            })
     }
}

