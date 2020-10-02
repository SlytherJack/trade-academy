import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (isAuthenticated) {
                        return <ErrorBoundary>
                            <Component {...props} />
                        </ErrorBoundary>
                    } else {
                        return <Redirect to="/login"/>
                    }
                }
            }
        />
    )
}

export default ProtectedRoute;
