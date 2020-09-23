import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
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
            user: null,
            isAuthenticated: false
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
            name: 'home',
            authRequired: true,
        },
        {
            path: '/login',
            component: Login,
            exact: true,
            name: 'login',
            authRequired: false,
        },
        {
            path: '/signup',
            component: Signup,
            exact: true,
            name: 'signUp',
            authRequired: false
        }
    ];

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.authenticateUser();
    }

    async authenticateUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();

            this.setState({
                isAuthenticated: true,
            });
        } catch (error) {
            this.setState({
                isAuthenticated: false,
            });

            console.log(error);
        }
    }

    render() {
        return (
            <ThemeProvider
                theme={theme}
            >
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
                                                if(!this.state.isAuthenticated) {
                                                    return <Redirect to="/login"/>;
                                                } else {
                                                    return (
                                                        <C
                                                            {...props}
                                                        />
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <C
                                                        {...props}
                                                    />
                                                );
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
