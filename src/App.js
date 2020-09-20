import React, { Component } from 'react';
import './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
        // light: will be calculated from palette.primary.main,
        main: '#5FB691',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#F87060',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

class App extends Component {
    constructor(props) {
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
            path: '/login',
            component: Login,
            exact: true,
            name: 'login',
            authRequired: false,
            customProps: {
                title: 'Login',
                name: 'login',
                store: authenticationStore,
            }
        },
        {
            path: '/signup',
            component: Signup,
            exact: true,
            name: 'signUp',
            authRequired: false,
            customProps: {
                title: 'Welcome',
                name: 'signUp',
                store: authenticationStore,
            }
        },
        {
            path: '/resendmail',
            component: ResendMail,
            exact: true,
            name: 'resendMail',
            authRequired: false,
            customProps: {
                title: 'Resend link',
                name: 'resendMail',
                store: authenticationStore,
            }
        },
        {
            path: '/create_password',
            component: CreatePassword,
            exact: true,
            name: 'createPassword',
            authRequired: false,
            customProps: {
                title: 'Generate Password',
                name: 'createPassword',
                store: authenticationStore,
            }
        },
        {
            path: '/forgot_password',
            component: ForgotPassword,
            exact: true,
            name: 'forgotPassword',
            authRequired: false,
            customProps: {
                title: 'Request new password',
                name: 'forgotPassword',
                store: authenticationStore,
            }
        }
    ];

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    {/*Routing is handled by this component*/}
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
                                            return (
                                                <C
                                                    {...props}
                                                    {...customProps}
                                                />
                                            );
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
