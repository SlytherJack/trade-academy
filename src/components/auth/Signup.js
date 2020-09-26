import React, { Component, Fragment } from 'react';
import { validateEmail, validatePassword } from '../../utils/helpers';
import './Auth.scss';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import { Auth } from 'aws-amplify';
import AlertModal from '../alert-modal/AlertModal';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            email: '',
            password: '',
            phone: '',
            signedUp: false,
            confirmationCode: '',
            signedUpSuccess: false,
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
        this.signUp();
    }

    componentDidMount() {
    }

    signUp() {
        this.setState({isLoading: true});

        const { fullName, email, password, phone, signedUp, confirmationCode } = this.state;

        if (!signedUp) {
            Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    phone_number: phone,
                    full_name: fullName
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

            this.showAlertModal(
                'Success',
                `Signup successful. Please check your Email for a confirmation
                    which will be arriving shortly. Use that code to complete the signup process.`,
                'Dismiss'
            );
        }
    }

    onSignupFailure = err => {
        this.setState({isLoading: false, signedUpSuccess: false});

        this.showAlertModal(
            'Error',
            `Something went wrong while signing you up.`,
            'Dismiss'
        );
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

    showAlertModal(alertModalType, alertModalTitle, alertModalBody, alertModalBtnText) {
        this.setState({openAlertModal: true, alertModalType, alertModalTitle, alertModalBody, alertModalBtnText});
    }

    render () {
        let content = null;
        const {
            email,
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
                                id="filled-basic"
                                label="Email"
                                variant="filled"
                                onChange={this.handleChange}
                                name="email"
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

                        <form className="auth-form signup" onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField
                                id="filled-basic"
                                label="Full Name"
                                variant="filled"
                                onChange={this.handleChange}
                                name="fullName"
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
                    onBtnClick={() => {}}
                />
            </Fragment>
        );
    }
}

export default Signup;
