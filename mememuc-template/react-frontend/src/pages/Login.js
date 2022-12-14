/**
 * References:
 * https://codepen.io/rares-lungescu/pen/KLbMvo
 * */

import React from "react";
import "../styles/login.css";

class Login extends React.Component {

    render() {
        return (
            <div id="loginform">
                <h2>Login</h2>
                <Form />
            </div>
        )
    }


}

const Form = props => (
    <div>
        <FormInput description="Username or Email" placeholder="Enter your username or email" type="text" />
        <FormInput description="Password" placeholder="Enter your password" type="password"/>
        <FormText />
        <FormButton title="Log in"/>
    </div>
);

const FormButton = props => (
    <div id="button" class="row">
        <button>{props.title}</button>
    </div>
);

const FormText = props => {
    <div class="signup">
        <p>Create a new account!</p>
    </div>
};

const FormInput = props => (
    <div class="row">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
    </div>
);

export default Login;