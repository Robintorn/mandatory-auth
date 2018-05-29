import React, {Component} from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {
    // get the initial state from AuthService.

    state = AuthService.getAuthState();
    message = '';


    login = (username, password) => {
        // login the user with the given credentials and update the component state upon success or failure respectively.

        AuthService.login({username, password})

            .catch(error => {
                console.log(error)
                this.message = `${error.error}`;
            })
            .then(() => {
                this.setState(AuthService.getAuthState())
                this.message = '';
            })

    };

    logout = () => {
        // logout the user and update the component with state given by AuthService.
        AuthService.logout()
        this.setState(AuthService.getAuthState())
    };

    testApi() {
        // test access to a protected API route and log the results.
        AuthService.getResource('friends') // Tar in friends som parameter i pathen.
            .then((res) => {
                console.log('friends: ', res)
            })
            .catch(error => {
                console.log('error message: ', error)
            })
    }

    // ...

    render() {
        // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.
        // isLoggedIn toggles which buttons/fields are hidden/displayed

        /*
          Här ser jag till att om access är true i staten så renderas det här först.
          Annars så får renderas login formen.
        */
        return(
        <div>
        {this.state.access ? (
            <div className="container">
            
                <div className="status">
                    <span>User ID: {this.state.name}</span>
                        <button onClick={this.testApi}>Test API</button>
                        <button onClick={this.logout}>Logout</button>
                </div>
            </div>
        ) : (
            <div className="container">
            
                <p className="error">{this.message}</p>
                    <div className="status">
                        <span>User ID: N/A</span>
                        <button onClick={this.testApi}>Test API</button>
            
                    </div>
            <Login onLogin={this.login}/> 
             </div> // Ger <Login /> componenten en prop där den kan ta användning av login-funktionen.
                    // Detta är för att jag ska kunna få in usernamet och passwordet som parametrar.
        )}
        </div>
        )
    }
}

export default App;