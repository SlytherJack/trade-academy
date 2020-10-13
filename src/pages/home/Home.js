import { Grid, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import AlertModal from '../../components/alert-modal/AlertModal';
import HomeHeader from '../../components/home-header/HomeHeader';
import HomePromoCard from '../../components/home-promo-card/HomePromoCard';
import LiveClass from '../../components/live-class/LiveClass';
import YoutubePlayer from '../../components/youtube-player/YoutubePlayer';
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
            alertModalBtnAction: this.dismissAlertModal,
            liveClasses: [
                {
                    title: 'Technical Trading Class',
                    body: 'Are you new to trading? Then start here. You will compare asset classes the best with the least risk.',
                    time: '6:30 PM - 7:30 PM',
                    date: '14 Oct 2020',
                    imgURL: `${process.env.PUBLIC_URL}/img/ashwin.jpg`
                },
                {
                    title: 'Upstox Platform Demo',
                    body: 'Are you new to trading? Then start here. You will compare asset classes the best with the least risk.',
                    time: '7:00 PM - 8:00 PM',
                    date: '14 Oct 2020',
                    imgURL: `${process.env.PUBLIC_URL}/img/ashwin.jpg`
                },
                {
                    title: 'Technical Trading Class',
                    body: 'Are you new to trading? Then start here. You will compare asset classes the best with the least risk.',
                    time: '6:30 PM - 7:30 PM',
                    date: '15 Oct 2020',
                    imgURL: `${process.env.PUBLIC_URL}/img/ashwin.jpg`
                }
            ]
        };
    }

    dismissAlertModal = () => {
        this.setState({openAlertModal: false});
    }

    onLiveClassBook = (event) => {

    }

    render () {
        const {
            openAlertModal,
            alertModalType,
            alertModalTitle,
            alertModalBody,
            alertModalBtnText,
            alertModalBtnAction,
            liveClasses
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

                        <div className="home-section how-it-works">
                            <Typography className="section-title" variant="h4" gutterBottom>
                                HOW IT WORKS?
                            </Typography>

                            <YoutubePlayer
                                width="960"
                                height="480"
                                videoID="ocXlUnq1GRA"
                                classNameProp="home-youtube-player"
                            ></YoutubePlayer>
                        </div>

                        <div className="home-section start-learning">
                            <Typography className="section-title" variant="h4" gutterBottom>
                                START LEARNING
                            </Typography>

                            <div className="live-classes-container">
                                {
                                    liveClasses.map((classData, index) => {
                                        return <LiveClass classData={classData} onClick={this.onLiveClassBook}></LiveClass>
                                    })
                                }
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
