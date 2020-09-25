import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render () {
        return (
            <h1>{this.props.customProps.user ? 'User is there' : 'User is not there'}</h1>
        );
    }
}

export default Home;
