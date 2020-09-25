import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            // A 'render' prop will be passed whose value will be a method
            return this.props.render(this.state.error, this.state.errorInfo);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
