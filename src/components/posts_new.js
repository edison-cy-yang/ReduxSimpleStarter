import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    //this field parameter contains some event handlers we need to wire up
    //to our JSX components
    //field.input is an object which contains a bunch of event handlers (onChange, onFocus)
    //...means I want all the properties of the object to be the properties of the input tag
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className=`form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched? error : ''}
                </div>
            </div>
        )
    }

    //this function can be used to post the form data to backend
    onSubmit(values) {
        this.props.createPost(values, () => {
            //this is one of the properties that react router passes into the component
            this.props.history.push('/');  
        });
    }

    render() {
        //handleSubmit is redux form making sure everything in the form is okay,
        //then it will pass the values of the form to the callback function onSubmit
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

//values is an object that contains all the information users have entered
function validate(values) {
    const errors = {};

    //Validate the inputs from values
    if(!values.title) {
        errors.title="Enter a title";
    }
    if(!values.categories) {
        errors.categories = "Enter some categories";
    }
    if(!values.content) {
        errors.content = "Enter some content please";
    }

    return errors;
}

//stack up multiple connect like helpers 
export default reduxForm({
    //form is the name of the form, there may be cases where you want to show multiple forms,
    //redux would be able to handle the states of these forms properly
    form: 'PostsNewForm',
    //validate function will be automatically called for us whenever a form is submitted
    validate
})(
    connect(null, { createPost })(PostsNew)
);