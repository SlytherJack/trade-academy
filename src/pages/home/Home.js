import { Grid } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import AlertModal from '../../components/alert-modal/AlertModal';
import HomeHeader from '../../components/home-header/HomeHeader';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openAlertModal: false,
            alertModalType: '',
            alertModalTitle: '',
            alertModalBody: '',
            alertModalBtnText: '',
            alertModalBtnAction: this.dismissAlertModal
        };
    }

    dismissAlertModal = () => {
        this.setState({openAlertModal: false});
    }

    render () {
        const {
            openAlertModal,
            alertModalType,
            alertModalTitle,
            alertModalBody,
            alertModalBtnText,
            alertModalBtnAction
        } = this.state;

        return (
            <Fragment>
                <Grid
                    container
                    direction="column"
                    className="showcase-container"
                >
                    <Grid className="grid-item" item xs={12} sm={12} lg={12} xl={12}>
                        <HomeHeader></HomeHeader>
                    </Grid>
                </Grid>
                <AlertModal
                    open={openAlertModal}
                    type={alertModalType}
                    title={alertModalTitle}
                    body={alertModalBody}
                    btnText={alertModalBtnText}
                    onBtnClick={alertModalBtnAction}
                />
            </Fragment>
        );
    }
}

export default Home;
