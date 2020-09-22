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
            signedUpSuccess: false,
            isLoading: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password, email, phone } = this.state;

        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
        .then(res => {
            if (res.userConfirmed) {
                this.setState({signedUpSuccess: true});
                alert('Signed Up');
            }
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

        return (
            <div class="auth-content-container">
                <Card className="auth-card">
                    <CardContent>
                        <Typography className="form-title" color="textSecondary" gutterBottom>
                            Signup
                        </Typography>

                        <form className="auth-form" noValidate autoComplete="off">
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

export default Signup;
