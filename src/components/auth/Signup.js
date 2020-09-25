import React, { Component } from 'react';
import { validateEmail, validatePassword } from '../../utils/helpers';
import './Auth.scss';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            phone: '',
            signedUp: false,
            confirmationCode: '',
            signedUpSuccess: false,
            isLoading: false
        };
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.signUp();
    }

    signUp() {
        this.setState({isLoading: true});

        const { username, password, email, phone, signedUp, confirmationCode } = this.state;

        if (!signedUp) {
            Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number: phone
                }
            })
            .then(this.onSignupSuccess)
            .catch(this.onSignupFailure);
        } else {

        }
    }

    onSignupSuccess = res => {
        if (res.userConfirmed) {
            this.setState({isLoading: false, signedUpSuccess: true});
        }
    }

    onSignupFailure = err => {
        this.setState({isLoading: false, signedUpSuccess: false});
    }

    confirmSignUp() {
        Auth.confirmSignUp(username, confirmationCode)
        .then(this.onConfirmSignUpSuccess)
        .catch(this.onConfirmSignUpFailure);
    }

    onConfirmSignUpSuccess = res => {
        this.setState({isLoading: false, signedUp: true});
    }

    onConfirmSignUpFailure = err => {
        this.setState({isLoading: false, signedUp: false});
    }

    render () {
        let content = null;
        const { signedUp, isLoading } = this.state;

        if (signedUp) {
            content = (
                <Card className="auth-card">
                    <CardContent>
                        <h2 className="form-title">Trade Academy</h2>
                        <p className="sub-title">Complete Signup</p>

                        <form className="auth-form confirm-signup" onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField
                                error={!validateEmail(this.username)}
                                id="filled-basic"
                                label="Username"
                                variant="filled"
                                onChange={this.handleChange}
                                name="username"
                                required
                            />
                            <TextField
                                id="filled-basic"
                                label="Confirmation Code"
                                variant="filled"
                                type="number"
                                onChange={this.handleChange}
                                name="confirmationCode"
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="auth-action-button"
                                disableElevation
                                size="large"
                            >
                                Confirm Signup
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            );
        } else {
            content = (
                <Card className="auth-card">
                    <CardContent>
                        <h2 className="form-title">Trade Academy</h2>
                        <p className="sub-title">Sign Up</p>

                        <form className="auth-form signup" onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            <TextField
                                id="filled-basic"
                                label="Username"
                                variant="filled"
                                onChange={this.handleChange}
                                name="username"
                                required
                            />
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
                                error={!validatePassword(this.password)}
                                id="filled-basic"
                                label="Password"
                                variant="filled"
                                type="password"
                                helperText="Password must be of 8 characters at least"
                                onChange={this.handleChange}
                                name="password"
                                required
                            />
                            <TextField id="filled-basic" label="Phone" variant="filled" />
                            <TextField id="filled-basic" label="Signup" variant="filled" />
                            <div className="loading-button-wrapper">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="auth-action-button"
                                    disabled={isLoading}
                                    disableElevation
                                    size="large"
                                >
                                    Signup
                                </Button>
                                {isLoading && <CircularProgress size={24} className="circular-progress" />}
                            </div>
                        </form>
                    </CardContent>
                </Card>
            );
        }

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
                    {content}
                </Grid>
            </Grid>
        );
    }
}

export default Signup;
