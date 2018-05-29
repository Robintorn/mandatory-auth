import React, { Component } from 'react';


class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    // update the component state with a change to either the username or password.
    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    };

    onChangePassword = (e) => {
        this.setState({password: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        // calls the passed callback from the parent <App> component.
        this.props.onLogin(this.state.username, this.state.password);
    }



    render() {
        // render a login form and perform manual validation.
        const permission = this.state.username.length > 0 && this.state.password.length > 7

        return(
        <form onSubmit={this.onSubmit}>
            <div className='form-group'>
                <label>User Name</label>
                <input
                    type='text'
                    className='input form-control'
                    placeholder='enter user name'
                    name='username'
                    onChange={this.onChangeUsername}
                    value={this.state.username}/>

                <label>Password</label>
                <input
                    type='password'
                    className='input form-control'
                    placeholder='enter password'
                    name='password'
                    onChange={this.onChangePassword}
                    value={this.state.password}/>
                <br/>

                <button type='submit' disabled={!permission}>Login</button>
            </div>
        </form>
        )
    }
};

export default Login;