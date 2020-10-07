const { CardContent, Card, Typography } = require("@material-ui/core");
import React from 'react';
import './HomePromoCard.scss';

function HomePromoCard(props) {
    const {num, title, content} = props;

    return (
        <Card className="home-promo-card">
            <CardContent>
                <Typography className="card-num" variant="h2" gutterBottom>
                    {num}
                </Typography>

                <Typography className="card-title" variant="h4" gutterBottom>
                    {title}
                </Typography>

                <Typography className="card-content" variant="subtitle1" gutterBottom>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default HomePromoCard;
