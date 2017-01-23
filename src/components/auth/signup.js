import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'


class Signup extends Component {

    handleFormSubmit(formProps){
        this.props.signupUser(formProps)
    }

    renderAlert(){
        if (this.props.errorMessage){
            return(
                <div className="alert alert-danger">
                    <strong>ERROR</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render(){
        const { handleSubmit, fields: { email, password, passwordConfirm}} = this.props
        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email: </label>
                    <imput className="form-control" {...email} />
                    {email.touched && email.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary" >Sign Up!</button>

            </form>
        )
    }
}

function validate(formProps){
    const errors = {}

    if(!formProps.email){
        errors.email = 'please enter an email'
    }

    if (!formProps.password){
        errors.password = 'please enter a password'
    }

    if (!formProps.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirmation'
    }

    if (formProps.password !== formProps.passwordConfirm){
        errors.password = 'Passwords must match'
    }

    console.log(formProps)

    //by default always want to return errors object
    return errors
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'], validate: validate
}, mapStateToProps, actions)(Signup)