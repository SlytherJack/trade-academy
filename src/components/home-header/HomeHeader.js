import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { MainScreen } from './main-screen.svg';
import './HomeHeader.scss';

function HomeHeader(props) {
    const styles = (theme) => ({
        root: {
        }
    });

    return (
        <div className="home-header-container">
            <img src={MainScreen} alt="Main Screen" className="main-screen"></img>
            <div class="text-container">
                <Typography variant="h3" gutterBottom>
                    THE BEST WAY TO LEARN TRADING
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Learn and trade scientific testing strategies by attending live online classes everyday
                </Typography>

                <Button
                    type="button"
                    variant="contained"
                    className="button-alternate"
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
