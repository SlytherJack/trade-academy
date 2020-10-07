import { Button, Typography } from '@material-ui/core';
import React from 'react';
import MainScreen from './main-screen.svg';
import './HomeHeader.scss';

function HomeHeader(props) {
    const styles = (theme) => ({
        root: {
        }
    });

    return (
        <div className="home-header-container">
            <MainScreen className="main-screen"/>
            <div className="text-container">
                <Typography variant="h3" className="main-title" gutterBottom>
                    THE BEST WAY TO LEARN TRADING
                </Typography>

                <Typography variant="h5" className="sub-title" gutterBottom>
                    Learn and trade scientific testing strategies by attending live online classes everyday.
                </Typography>

                <Button
                    type="button"
                    variant="contained"
                    className="button-alternate download-app"
                    disableElevation
                    size="large"
                >
                    DOWNLOAD APP
                </Button>
            </div>
        </div>
    );
}

export default HomeHeader;
