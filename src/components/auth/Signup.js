import React, { Component, Fragment } from 'react';
import { validateEmail, validatePassword, validatePhone } from '../../utils/helpers';
import './Auth.scss';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import AlertModal from '../alert-modal/AlertModal';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            password: '',
            phone: '',
            signedUp: false,
            signUpComplete: false,
            confirmationCode: '',
            isLoading: false,
            openAlertModal: false,
            alertModalType: '',
            alertModalTitle: '',
            alertModalBody: '',
            alertModalBtnText: '',
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

        if (!this.state.signedUp) {
            this.signUp();
        } else {
            this.confirmSignUp();
        }
    }

    componentDidMount() {
    }

    signUp() {
        this.setState({isLoading: true});

        const { fullName, email, password, phone, signedUp, confirmationCode } = this.state;

        Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                phone_number: phone
            }
        })
        .then(this.onSignupSuccess)
        .catch(this.onSignupFailure);
    }

    onSignupSuccess = res => {
        if (res.user) {
            this.setState({isLoading: false, signedUp: true});

            this.showAlertModal(
                'Success',
                'Success',
                `Signup successful. Please check your Email for a confirmation
                    which will be arriving shortly. Use that code to complete the signup process.`,
                'Dismiss'
            );
        }
    }

    onSignupFailure = err => {
        this.setState({isLoading: false, signedUpSuccess: false});

        let erroMsg = '';

        switch(err.code) {
            case 'UsernameExistsException':
                erroMsg = 'A user with that email already exists. Please login.';
            break;
            default:
                erroMsg = `Something went wrong while signing you up.`;
            break;
        }

        this.showAlertModal(
            'Error',
            'Error',
            erroMsg,
            'Dismiss'
        );
    }

    confirmSignUp() {
        Auth.confirmSignUp(username, confirmationCode)
        .then(this.onConfirmSignUpSuccess)
        .catch(this.onConfirmSignUpFailure);
    }

    onConfirmSignUpSuccess = res => {
        this.setState({isLoading: false, signUpComplete: true});

        this.showAlertModal(
            'Success',
            'Success',
            `Signup complete. You will now be redirected to the login page.`,
            'Dismiss'
        );
    }

    onConfirmSignUpFailure = err => {
        this.setState({isLoading: false});

        this.showAlertModal(
            'Error',
            'Error',
            `Could not complete sign up process. Please try again.`,
            'Dismiss'
        );
    }

    showAlertModal(alertModalType, alertModalTitle, alertModalBody, alertModalBtnText) {
        this.setState({openAlertModal: true, alertModalType, alertModalTitle, alertModalBody, alertModalBtnText});
    }

    dismissAlertModal() {
        this.setState({openAlertModal: false});
    }

    render () {
        let content = null;
        const {
            email,
            password,
            phone,
            signedUp,
            isLoading,
            openAlertModal,
            alertModalType,
            alertModalTitle,
            alertModalBody,
            alertModalBtnText
        } = this.state;

        if (signedUp) {
            content = (
                <Card className="auth-card">
                    <CardContent>
                        <h2 className="form-title">Trade Academy</h2>
                        <p className="sub-title">Complete Signup</p>

                        <form className="auth-form confirm-signup" onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField
                                error={!validateEmail(email)}
                                id="confirm-code-email-input"
                                label="Email"
                                variant="filled"
                                onChange={this.handleChange}
                                name="email"
                                required
                            />
                            <TextField
                                error={!validateEmail(email)}
                                id="confirm-code-code-input"
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

                        <form className="auth-form signup" onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField
                                id="signup-name-input"
                                label="Full Name"
                                variant="filled"
                                onChange={this.handleChange}
                                name="fullName"
                                size="small"
                                required
                            />
                            <TextField
                                error={!validateEmail(email)}
                                id="signup-email-input"
                                label="Email"
                                variant="filled"
                                type="email"
                                onChange={this.handleChange}
                                name="email"
                                size="small"
                                required
                            />
                            <TextField
                                error={!validatePassword(password)}
                                id="signup-password-input"
                                label="Password"
                                variant="filled"
                                type="password"
                                helperText="Password must be of 8 characters at least and contain one Uppercase,
                                one Lowercase letter, one Special Character and a Number"
                                onChange={this.handleChange}
                                name="password"
                                size="small"
                                required
                            />
                            <TextField
                                error={!validatePhone(phone)}
                                id="signup-phone-input"
                                helperText="Indian phone numbers only. Eg: +919869589963"
                                label="Phone"
                                variant="filled"
                                onChange={this.handleChange}
                                name="phone"
                                size="small"
                            />
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

                        <p className="copyright-text">
                            By signing up, you agree to Trade Academy's Terms and Conditions.
                        </p>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Fragment>
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
                <AlertModal
                    open={openAlertModal}
                    type={alertModalType}
                    title={alertModalTitle}
                    body={alertModalBody}
                    btnText={alertModalBtnText}
                    onBtnClick={this.dismissAlertModal}
                />
            </Fragment>
        );
    }
}

export default Signup;
