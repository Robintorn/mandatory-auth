import http from './http';

const jwt_decode = require('jwt-decode');

// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;

    constructor() {
        // perform any logic upon application startup here...

        // Gör så att user alltid tar in tokenen från lokal-storage.
        // Samtidigt som man också ser till så att användaren inte har
        // Access till profilen.
        this.user = JSON.parse(localStorage.getItem('accessToken')) || { access: false};
    }

    // use this method to catch http errors. 
    handleError(error) {
        throw error.data

    }

    // convenience method to get authentication state for a user, which should include the 'user' class property; 
    // this method is used in the <App> component.

    // Detta är för att kunna uppdatera staten varje gång i componenten när den
    // Ska renderas om.
    getAuthState() {
        return this.user;
    }

    login(credentials) {
        // invoke the relevant API route for authenticating the user with the given credentials and return a Promise
        // that fulfills with authentication state.
        // 
        // Make sure to handle a successful authentication by storing and also decoding the returned token, as well as
        // catching http errors.

        return http.post("/api/auth", {body: credentials})
            .then(res => {
                localStorage.setItem('accessToken', JSON.stringify(this.user));             
                this.user.access = true;
                this.user = jwt_decode(res.data.token)
                this.user.token = res.data.token
            })
            .catch(error => {
                this.handleError(error.response)
            })


    }

    logout() {
        // logout the current user by removing the corresponding token.
        this.user.access = false; // Vet inte varför det inte funkar...
        localStorage.removeItem('accessToken')

        return this.user;
    }

    getResource(resource) {
        // invoke a protected API route by including the Authorization header and return a Promise that fulfills 
        // with the response body. 
        //
        // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.

        return http.get(`/api/${resource}`, 
        {headers: {Authorization: `Bearer ${this.user.token}`}})
            .then(res => {
                return res.data.friends
            })

            // Tar hjälp av handleError funktionen när jag ska hantera
            // Http-errors.
            .catch(error => {
                this.handleError(error.response)
            })

    }
}

export default new AuthService();