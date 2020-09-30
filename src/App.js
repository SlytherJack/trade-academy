import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import AlertModal from './components/alert-modal/AlertModal';
import Login from './components/auth/Login';
import ErrorBoundary from './components/ErrorBoundary';
import Signup from './components/auth/Signup';
import Home from './components/home/Home';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5FB691',
        },
        secondary: {
            main: '#F87060',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        };
    }

    /**
     * @type {object} routes - This array contains configuration objects which map Routes to Modules,
     * along-with additional meta-data
     */
    routes = [
        {
            path: '/',
            component: Home,
            exact: true,
            name: 'index',
            authRequired: true
        },
        {
            path: '/home',
            component: Home,
            exact: true,
            name: 'home',
            authRequired: true
        },
        {
            path: '/login',
            component: Login,
            exact: true,
            name: 'login',
            authRequired: false,
            customProps: {
                onSignInSuccess: () => {
                    this.setState({
                        isAuthenticated: true,
                        isAuthenticating: false
                    });
                }
            }
        },
        {
            path: '/signup',
            component: Signup,
            exact: true,
            name: 'signup',
            authRequired: false
        }
    ];

    componentDidMount() {
        this.authenticateUser();
    }

    authenticateUser() {
        Auth.currentAuthenticatedUser()
        .then(this.onCurrentAuthenticatedUserSuccess)
        .catch(this.onCurrentAuthenticatedUserFailure);
    }

    onCurrentAuthenticatedUserSuccess = user => {
        this.setState({
            isAuthenticated: true,
            isAuthenticating: false
        });
    }

    onCurrentAuthenticatedUserFailure = error => {
        this.setState({
            isAuthenticated: false,
            isAuthenticating: false
        });
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <BrowserRouter>
                    {
                        /**
                         * Looping over the routes array defined at the top and spitting out
                         * <Route/> component for each of our modules defined in this project
                         */
                        this.routes.map(({ path, component: C, exact, name, customProps, authRequired }) => (
                            <Route
                                path={path}
                                exact={exact}
                                key={name}
                                render={
                                    (props) => {
                                        if (authRequired) {
                                            if (!isAuthenticated) {
                                                return <Redirect to="/login"/>;
                                            } else {
                                                <ErrorBoundary
                                                    render={(error, errorInfo) => {
                                                        <AlertModal
                                                            open={true}
                                                            type="error"
                                                            title="Error"
                                                            body={errorInfo}
                                                            btnText="Close"
                                                        />
                                                    }}
                                                >
                                                    <C {...props} customProps={customProps}/>
                                                </ErrorBoundary>
                                            }
                                        } else {
                                            if (isAuthenticated) {
                                                return <Redirect to="/home"/>;
                                            } else {
                                                <ErrorBoundary
                                                    render={(error, errorInfo) => {
                                                        <AlertModal
                                                            open={true}
                                                            type="error"
                                                            title="Error"
                                                            body={errorInfo}
                                                            btnText="Close"
                                                        />
                                                    }}
                                                >
                                                    <C {...props} customProps={customProps}/>
                                                </ErrorBoundary>
                                            }
                                        }
                                    }
                                }
                            />
                        ))
                    }
                    </BrowserRouter>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
