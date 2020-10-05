import { Component } from 'react';
import { validateCode, validatePassword } from '../../utils/helpers';
import './Auth.scss';
import AlertModal from '../../components/alert-modal/AlertModal';

class Signup extends Component {
    constructor(props) {
        this.state = {
            screen: 'Forgot Password',
            email: '',
            isModalOpen: false,
            isLoading: false
        };
    }

    dismissModal = () => {
        this.setState({isModalOpen: false});
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password, email, phone, signedUp } = this.state;

        Auth.forgotPassword(email)
        .then(res => {
            <AlertModal
                open={this.state.isModalOpen}
                title="Confirmation Mail Sent"
                body="We have sent a verification code to your E-mail ID. Please copy it to the next screen along with your new password to complete the process!"
                btnText="Okay"
                onBtnClick={this.dismissModal}
            />
        })
        .catch(error => {
            let title = "Error";
            let body = "";
            let btnText = "Dismiss";
            let onBtnClick = () => this.dismissModal();

            switch (error.code) {
                case "UserNotFoundException":
                    body = "We are sorry, but we couldn't verify your account. Try to sign up again on our platform or else if you're facing a problem you may contact your account manager.";
                    onBtnClick = () => {
                        this.dismissModal();
                        this.props.history.push('/signup');
                    };
                    break;
                case "CodeDeliveryFailureException":
                    body = "We are sorry, but we couldn't send the verification code to your E-mail. Please check the email you've entered and try again.";
                    break;
                case "InternalErrorException":
                    body = "Our servers are down for the moment. Please try again after sometime.";
                    break;
                default:
                    body = "Something went wrong. Please try again later.";
                    break;
            }

            <AlertModal
                title={title}
                body={body}
                btnText={btnText}
                onBtnClick={onBtnClick}
            />
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
        let content = null;

        if (this.state.screen === 'Forgot Password') {
            content = (
                <CardContent>
                    <Typography className="form-title" color="textSecondary" gutterBottom>
                        Forgot Password
                    </Typography>

                    <form className="auth-form forgot-password" noValidate autoComplete="off">
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
                        <Button variant="contained" color="primary">
                            Send Verification Code
                        </Button>
                    </form>
                </CardContent>
            );
        } else if (this.state.screen === 'Forgot Password Verification') {
            <CardContent>
                <Typography className="form-title" color="textSecondary" gutterBottom>
                    Forgot Password
                </Typography>

                <form className="auth-form forgot-password" noValidate autoComplete="off">
                    <TextField
                        error={!validateCode(this.email)}
                        id="filled-basic"
                        label="Verification Code"
                        variant="filled"
                        type="text"
                        onChange={this.handleChange}
                        name="code"
                        required
                    />
                    <Button variant="contained" color="primary">
                        Send Verification Code
                    </Button>
                </form>
            </CardContent>
        }

        render (
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

                    </Card>
                </Grid>
            </Grid>
        );
    }
}

export default Signup;
