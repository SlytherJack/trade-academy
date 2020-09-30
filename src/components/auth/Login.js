import React, { Component, Fragment } from 'react';
import { validateEmail, validatePassword } from '../../utils/helpers';
import { Auth } from 'aws-amplify';
import { Button, Card, CardContent, CircularProgress, Grid, IconButton, responsiveFontSizes, TextField } from '@material-ui/core';
import './Auth.scss';
import { Link } from 'react-router-dom';
import AlertModal from '../alert-modal/AlertModal';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            email: '',
            password: '',
            newPassword: '',
            setNewPassword: false,
            isLoading: false,
            openAlertModal: false,
            alertModalType: '',
            alertModalTitle: '',
            alertModalBody: '',
            alertModalBtnText: '',
            alertModalBtnAction: this.dismissAlertModal
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {setNewPassword} = this.state;

        this.login();
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

    redirectToHome = () => {
        this.props.history.push("/login");
    }

    login() {
        const { email, password } = this.state;

        this.setState({isLoading: true});

        Auth.signIn(email, password)
        .then(this.onLoginSuccess)
        .catch(this.onLoginFailure);
    }

    onLoginSuccess = user => {
        if (user.hasOwnProperty("challengeName") && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.setState({
                isLoading: false,
                setNewPassword: true
            });

            this.showAlertModal('Info', 'Time to set new password', `Seems like you are entering a temporary password. Please create a fresh new password using the link previously sent to your mail or generate a new link here.`, 'Dismiss');
        } else {
            this.props.customProps.onSignInSuccess();
            this.redirectToHome();
        }
    }

    onLoginFailure = err => {
        this.setState({
            isLoading: false
        });

        this.showAlertModal('Error', 'Error', err.message, 'Dismiss');
    }

    setNewPassword() {
        const { user, password, newPassword } = this.state;

        this.setState({isLoading: true, setNewPassword: false});

        Auth.changePassword(user, password, newPassword)
        .then(this.onSetNewPasswordSuccess)
        .catch(this.onSetNewPasswordFailure);
    }

    onSetNewPasswordSuccess = res => {
        this.setState({
            isLoading: false
        });

        this.props.customProps.onSignInSuccess();
        this.redirectToHome();
    }

    onSetNewPasswordFailure = err => {
        this.setState({
            isLoading: false,
        });

        this.showAlertModal('Error', 'Error', err.message, 'Dismiss');
    }

    showAlertModal = (alertModalType, alertModalTitle, alertModalBody, alertModalBtnText, alertModalBtnAction = this.dismissAlertModal) => {
        this.setState({openAlertModal: true, alertModalType, alertModalTitle, alertModalBody, alertModalBtnText, alertModalBtnAction});
    }

    dismissAlertModal = () => {
        this.setState({openAlertModal: false});
    }

    render () {
        let content = null;
        const {
            isLoading,
            email,
            newPassword,
            setNewPassword,
            openAlertModal,
            alertModalType,
            alertModalTitle,
            alertModalBody,
            alertModalBtnText,
            alertModalBtnAction
        } = this.state;

        if (setNewPassword) {
            content = (
                <CardContent>
                    <h2 className="form-title">Trade Academy</h2>
                    <p className="sub-title">Set new password</p>

                    <form className="auth-form set-new-password" onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            id="old-password"
                            label="Password"
                            variant="filled"
                            type="password"
                            onChange={this.handleChange}
                            name="password"
                            required
                        />
                        <TextField
                            error={!validatePassword(newPassword)}
                            id="new-password"
                            label="Password"
                            variant="filled"
                            type="password"
                            onChange={this.handleChange}
                            name="newPassword"
                            required
                        />
                        <div className="loading-button-wrapper">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="auth-action-button"
                                disableElevation
                                size="large"
                            >
                                Proceed
                            </Button>
                            {isLoading && <CircularProgress size={24} className="circular-progress" />}
                        </div>
                    </form>
                </CardContent>
            );
        } else {
            content = (
                <CardContent>
                    <h2 className="form-title">Trade Academy</h2>
                    <p className="sub-title">Login to continue</p>

                    <form className="auth-form login" onSubmit={this.handleSubmit} autoComplete="off">
                        <TextField
                            error={!validateEmail(email)}
                            id="email"
                            label="Email"
                            variant="filled"
                            type="email"
                            onChange={this.handleChange}
                            name="email"
                            required
                        />
                        <TextField
                            id="password"
                            label="Password"
                            variant="filled"
                            type="password"
                            onChange={this.handleChange}
                            name="password"
                            required
                        />
                        <div className="loading-button-wrapper">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="auth-action-button"
                                disableElevation
                                size="large"
                            >
                                Login
                            </Button>
                            {isLoading && <CircularProgress size={24} className="circular-progress" />}
                        </div>
                    </form>

                    <div className="secondary-inputs">
                        <Link to="/signup">New here? Create an account.</Link>
                        <Link to="/forgot_password">Forgot Password?</Link>
                    </div>

                    <p className="copyright-text">
                        &#169; Trade Academy 2020-21. All Rights Reserved.
                        <br/>
                        All content shown here is the sole property of Trade Academy.
                        Any attempt to infringe rights shall be treated with power of law.
                    </p>
                </CardContent>
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
                        <Card className="auth-card">
                            {content}
                        </Card>
                    </Grid>
                </Grid>
                <AlertModal
                    open={openAlertModal}
                    type={alertModalType}
                    title={alertModalTitle}
                    body={alertModalBody}
                    btnText={alertModalBtnText}
                    onBtnClick={alertModalBtnAction}
                />
            </Fragment>
        );
    }
}

export default Login;
