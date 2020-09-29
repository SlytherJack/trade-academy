import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { validateEmail } from '../../utils/helpers';
import { Auth } from 'aws-amplify';
import { Button, Card, CardContent, Grid, IconButton, responsiveFontSizes, TextField } from '@material-ui/core';
import './Auth.scss';
import { Link } from 'react-router-dom';

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

        if (!this.state.setNewPassword) {
            this.login();
        } else {
            this.setNewPassword();
        }
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

    componentDidMount() {
        this.getCurrentAuthenticatedUser();
    }

    getCurrentAuthenticatedUser() {
        Auth.currentAuthenticatedUser()
        .then(this.onGetCurrentAuthenticatedUserSuccess);
    }

    onGetCurrentAuthenticatedUserSuccess = user => {
        this.redirectToHome();
    }

    redirectToHome = () => {
        const history = useHistory();
        history.push("/");
    }

    login() {
        const { email, password } = this.state;

        this.setState({isLoading: true});

        Auth.SignIn(email, password)
        .then(this.onLoginSuccess)
        .catch(this.onLoginFailure);
    }

    onLoginSuccess = user => {
        if (user.hasOwnProperty("challengeName") && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.setState({
                isLoading: false,
                loggedInSuccess: true,
                snackBarMessage: "Seems like you are entering a temporary password. Please create a fresh new password using the link previously sent to your mail or generate a new link here."
            });
        }
    }

    onLoginFailure = err => {
        this.setState({
            isLoading: false
        });

        this.showAlertModal('Error', 'Error', 'Error signing in. Please try again.', 'Dismiss', this.dismissAlertModal);
    }

    setNewPassword() {
        const { user, password, newPassword } = this.state;

        this.setState({isLoading: true, setNewPassword: false});

        Auth.changePassword(user, password, newPassword)
        .then(this.onSetNewPasswordSuccess)
        .catch(this.onSetNewPasswordFailure);
    }

    onSetNewPasswordSuccess = res => {
        if (responsiveFontSizes) {
            this.setState({
                isLoading: false
            });
        }
    }

    onSetNewPasswordFailure = err => {
        this.setState({
            isLoading: false,
            loggedInSuccess: false
        });

        this.showAlertModal('Error', 'Error', 'Error setting new password. Please try again.', 'Dismiss', this.dismissAlertModal);
    }

    showAlertModal = (alertModalType, alertModalTitle, alertModalBody, alertModalBtnText, alertModalBtnAction = this.dismissAlertModal) => {
        this.setState({openAlertModal: true, alertModalType, alertModalTitle, alertModalBody, alertModalBtnText, alertModalBtnAction});
    }

    dismissAlertModal = () => {
        this.setState({openAlertModal: false});
    }

    render () {
        let content = null;
        const { loggedIn } = this.state;

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
                                        size="large"
                                    >
                                        Login
                                    </Button>
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
                        </Card>
                        {snackBar}
                    </Grid>
                </Grid>
            );
        }
    }
}

export default Login;
