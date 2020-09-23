import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { validateEmail, validatePassword } from '../../utils/helpers';
import { Auth } from 'aws-amplify';
import { Button, Card, CardContent, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import './Auth.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            snackBarMessage: '',
            loggedIn: false,
            setNewPassword: false,
            isLoading: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { signedIn, email, password } = this.state;

        this.setState({isLoading: true});

        Auth.SignIn({
            username,
            password
        })
        .then(user => {
            if (user.hasOwnProperty("challengeName") && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                this.setState({
                    isLoading: false,
                    loggedInSuccess: false,
                    snackBarMessage: "Seems like you are entering a temporary password. Please create a fresh new password using the link previously sent to your mail or generate a new link here."
                });
            }

            this.setState({loggedInSuccess: true});
        })
        .catch(err => {
            this.setState({
                isLoading: false,
                loggedInSuccess: false,
                snackBarMessage: "Error logging in."
            });
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose(e) {
        e.preventDefault();
    }

    render () {
        let snackBar = null;
        const { loggedIn, snackBarMessage } = this.state;

        if (snackBarMessage.length) {
            button = (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={snackBarMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            );
        }

        if (loggedIn) {
            this.props.history.push("/home");
        } else {
            return (
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className="main-container login"
                >
                    <Grid
                        className="grid-item"
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                    >
                        <Card className="auth-card">
                            <CardContent>
                                <h2 className="form-title">Trade Academy</h2>
                                <p className="sub-title">Login to continue</p>

                                <form className="auth-form Login" noValidate autoComplete="off">
                                    <TextField
                                        error={!validateEmail(this.email)}
                                        id="filled-basic"
                                        label="Email"
                                        variant="filled"
                                        type="email"
                                        onChange={this.handleChange}
                                        name="email"
                                        required
                                    />
                                    <TextField
                                        id="filled-basic"
                                        label="Password"
                                        variant="filled"
                                        type="password"
                                        onChange={this.handleChange}
                                        name="password"
                                        required
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="auth-action-button"
                                        disableElevation
                                    >
                                        Login
                                    </Button>
                                </form>

                                <p class="copyright-text">
                                    &#169; Trade Academy 2020-21. All Rights Reserved.
                                    <br/>
                                    All content shown here is the sole property of Trade Academy.
                                    Any attempt to infringe rights shall be treated with power of law.
                                </p>
                            </CardContent>
                        </Card>
                        {snackBar}
                    </Grid>
                </Grid>
            );
        }
    }
}

export default Login;
