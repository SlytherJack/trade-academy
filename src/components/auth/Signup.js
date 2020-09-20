import { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

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

    handleChange(e) {
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
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                        be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                {snackBar}
            </div>
        );
    }
}

export default Signup;
