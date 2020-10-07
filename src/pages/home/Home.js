import { Grid, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import AlertModal from '../../components/alert-modal/AlertModal';
import HomeHeader from '../../components/home-header/HomeHeader';
import HomePromoCard from '../../components/home-promo-card/HomePromoCard';
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

        const cardContents = [
            `Learning at TA is always free. Book an online class and
            start learning more than 20 topics within the app.`,
            `Premium users receive real-time notifications when
            strategies trigger an opportunity.`,
        ];

        return (
            <Fragment>
                <Grid
                    container
                    direction="column"
                    className="showcase-container"
                >
                    <Grid className="grid-item" item xs={12} sm={12} lg={12} xl={12}>
                        <HomeHeader></HomeHeader>

                        <div className="home-section promo">
                            <Typography className="section-title" variant="h4" gutterBottom>
                                TRADE DURING THE DAY.
                                LEARN IN THE EVENING.
                            </Typography>

                            <div className="promo-cards-container">
                                <HomePromoCard num="01" title="LEARN ONLINE" content={cardContents[0]}></HomePromoCard>
                                <HomePromoCard num="02" title="LIVE SCANNER" content={cardContents[1]}></HomePromoCard>
                            </div>
                        </div>
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
