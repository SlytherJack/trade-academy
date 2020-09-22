import { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { validateEmail, validatePassword } from '../../utils/helpers';

class Signup extends Component {
    constructor(props) {
        this.state = {
            username: '',
            email: '',
            password: '',
            phone: '',
            signedUp: false,
            confirmationCode,
            signedUpSuccess: false,
            isLoading: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password, email, phone, signedUp } = this.state;

        if (!signedUp) {
            Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    phone_number: phone
                }
            })
            .then(res => {
                if (res.userConfirmed) {
                    this.setState({signedUpSuccess: true});
                }
            })
            .catch(err => {
                this.setState({signedUpSuccess: true});
            });
        } else {
            Auth.confirmSignUp(username, confirmationCode)
            .then(res => {
                this.setState({signedUp: true});
                console.log('Already signed up.');
            });
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

    render () {
        let snackBar = null;
        const { signedUp } = this.state;

        if (this.state.signedUpSuccess) {
            button = (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Note archived"
                    action={
                    <React.Fragment>
                        Signed Up!
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            );
        }

        if (signedUp) {
            return (
                <div class="auth-content-container">
                    <Card className="auth-card">
                        <CardContent>
                            <Typography className="form-title" color="textSecondary" gutterBottom>
                                Signup
                            </Typography>

                            <form className="auth-form confirm-signup" noValidate autoComplete="off">
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
                                <Button variant="contained" color="primary">
                                    Confirm Signup
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {snackBar}
                </div>
            );
        } else {
            return (
                <div class="auth-content-container">
                    <Card className="auth-card">
                        <CardContent>
                            <Typography className="form-title" color="textSecondary" gutterBottom>
                                Signup
                            </Typography>

                            <form className="auth-form signup" noValidate autoComplete="off">
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
                                <Button variant="contained" color="primary">
                                    Signup
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {snackBar}
                </div>
            );
        }
    }
}

export default Signup;
