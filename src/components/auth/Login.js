const { Component } = require("react");

class Login extends Component {
    constructor(props) {
        this.state = {
            email: '',
            password: '',
            keepMeLoggedIn: false,
            isLoading: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleChange(e) {
        e.preventDefault();

    }
}
