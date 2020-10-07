import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/home/Home';
import AuthService from './services/auth.service';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Lato',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
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

        this.authService = new AuthService();

        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        this.authenticateUser();
    }

    authenticateUser() {
        this.authService.getCurrentAuthenticatedUser()
        .then(this.onGetCurrentAuthenticatedUserSuccess)
        .catch(this.onGetCurrentAuthenticatedUserFailure);
    }

    onGetCurrentAuthenticatedUserSuccess = user => {
        this.setState({
            isAuthenticated: true
        });
    }

    onGetCurrentAuthenticatedUserFailure = error => {
        this.setState({
            isAuthenticated: false
        });
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Switch>
                            <ProtectedRoute exact path='/' isAuthenticated={isAuthenticated} component={Home} />
                            <Route exact path='/login'
                                render={
                                    props => {
                                        return <ErrorBoundary>
                                            <Login
                                                {...props}
                                                isAuthenticated={isAuthenticated}
                                                onGetCurrentAuthenticatedUserSuccess={this.onGetCurrentAuthenticatedUserSuccess}
                                            />
                                        </ErrorBoundary>
                                    }
                                }
                            />
                            <Route exact path='/signup'
                                render={
                                    props => {
                                        return <ErrorBoundary>
                                            <Signup
                                                {...props}
                                                isAuthenticated={isAuthenticated}
                                            />
                                        </ErrorBoundary>
                                    }
                                }
                            />
                        </Switch>
                    </Router>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
