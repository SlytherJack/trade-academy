import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import './LiveClass.scss';

function LiveClass(props) {
    const { title, imgURL, body, time, date, onClick } = props.classData;

    const imgStyle = {
        backgroundImage: 'url(' + imgURL + ')',
    };

    return (
        <Card className="live-class-card">
            <CardContent>
                <div style={imgStyle} className="live-class-img"></div>

                <div className="main-content-container">
                    <Typography className="live-class-content title" variant="h6" gutterBottom>
                        {title}
                    </Typography>

                    <Typography className="live-class-content body" variant="body2" gutterBottom>
                        {body}
                    </Typography>

                    <Typography className="live-class-content time" variant="body1" gutterBottom>
                        {time}
                    </Typography>

                    <Typography className="live-class-content date" variant="body1" gutterBottom>
                        {date}
                    </Typography>
                </div>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    className="book-btn"
                    disableElevation
                    size="large"
                    onClick={onClick}
                >
                    BOOK NOW
                </Button>
            </CardActions>
        </Card>
    );
}

export default LiveClass;
